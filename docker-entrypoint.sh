#!/usr/bin/env bash
#
# Starts the indexer, and re-runs it once with --restart if — and only if —
# Envio refuses to boot because config.yaml/schema.graphql/the ABI changed
# incompatibly with the data already in ENVIO_PG_SCHEMA.
#
# The reset is keyed to that specific failure, never to the container starting.
# A rolling update, node drain, evicted pod or OOMKill re-runs this script,
# `envio start` resumes from the last indexed block, and the database is left
# alone. Putting --restart in CMD instead would wipe on every one of those.
set -uo pipefail

readonly MARKER="incompatible with the existing indexer data"
readonly BOOT_LOG="${BOOT_LOG:-/tmp/envio-boot.log}"
readonly BOOT_LOG_LINES=500

indexer_pid=""
forward_signal() {
  [ -n "$indexer_pid" ] && kill -TERM "$indexer_pid" 2>/dev/null
}
trap forward_signal TERM INT

# Runs the indexer in the foreground and returns its exit status. Every line is
# forwarded to stdout for the pod logs, but only the first BOOT_LOG_LINES are
# also written to BOOT_LOG: a healthy indexer runs for weeks, and an uncapped
# capture of trace-level logs would fill the container filesystem. We only ever
# read BOOT_LOG after an early exit, and the boot error lands in the first
# handful of lines, well inside the cap.
run_indexer() {
  : > "$BOOT_LOG"
  node node_modules/envio/bin.mjs start \
    > >(awk -v logfile="$BOOT_LOG" -v cap="$BOOT_LOG_LINES" \
          'NR<=cap { print > logfile; fflush(logfile) } { print; fflush() }') 2>&1 &
  indexer_pid=$!
  wait "$indexer_pid"
  local status=$?
  indexer_pid=""
  return $status
}

run_indexer
status=$?
[ $status -eq 0 ] && exit 0

# 128+SIGTERM and 128+SIGINT: the orchestrator asked us to stop. That is an
# ordinary pod shutdown, not a failed boot, so exit quietly rather than logging
# it as an error and weighing a reset.
if [ $status -eq 143 ] || [ $status -eq 130 ]; then
  exit $status
fi

if ! grep -qF "$MARKER" "$BOOT_LOG"; then
  echo "envio start failed (exit $status) for a reason other than an incompatible config; not resetting" >&2
  exit $status
fi

echo "config is incompatible with the indexed data — clearing ENVIO_PG_SCHEMA and re-indexing from start_block" >&2

# exec, so the reset run replaces this shell and the indexer becomes PID 1: it
# is the last thing we do, and nothing remains to observe. If it dies before
# writing the new config the next boot resets again, which costs nothing — the
# old data is already gone. Once it does write, the config matches and no
# further boot resets.
exec node node_modules/envio/bin.mjs start --restart
