FROM node:24-slim AS build
RUN npm install -g pnpm@10
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm codegen

FROM node:24-slim
WORKDIR /app
LABEL org.opencontainers.image.source=https://github.com/TilakMaddy/my-envio-indexer
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 9898
CMD ["node", "node_modules/envio/bin.mjs", "start"]
