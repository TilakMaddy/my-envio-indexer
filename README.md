## Envio Indexer

*Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all [Envio](https://envio.dev) indexer features*

### Run

```bash
pnpm dev
```

Visit http://localhost:8080 to see the GraphQL Playground, local password is `testing`.

### Generate files from `config.yaml` or `schema.graphql`

```bash
pnpm codegen
```

### Pre-requisites

- [Node.js v22+ (v24 recommended)](https://nodejs.org/en/download/current)
- [pnpm (use v8 or newer)](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/) or [Podman](https://podman.io/)

### What we added on top of the Envio scaffold

Everything else in this repo is stock `envio init` output. These four files are ours:

| File | Why |
| --- | --- |
| `Dockerfile` | Two-stage build (`pnpm install` + `pnpm codegen`, then a slim runtime) that ships the indexer as a container image. Its entrypoint script is inlined as a heredoc: it runs `envio start`, and re-runs once with `--restart` only when Envio refuses to boot because `config.yaml`/`schema.graphql`/the ABI is incompatible with the data already in `ENVIO_PG_SCHEMA`. A rolling update, node drain, evicted pod or OOMKill resumes from the last indexed block instead of wiping. |
| `.dockerignore` | Keeps `.git`, `node_modules`, `.env`, `.envio`, build output and logs out of the build context, so `COPY . .` picks up only source. |
| `.github/workflows/release.yml` | On pushes to `staging` and `production`, builds the image for `linux/amd64` and `linux/arm64` and pushes it to GHCR, tagged by branch and commit SHA. |
| `justfile` | `just build [tag]` builds the image locally; `just deploy-kind [tag]` loads it into the `local-platform` kind cluster and restarts the `indexer` statefulset in the `chain-indexer` namespace. |
