FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# postinstall runs fumadocs-mdx, which needs next.config and source.config
RUN npm ci --ignore-scripts

FROM node:22-alpine AS builder
WORKDIR /app
# Version strings stamped into install snippets at build time (see source.config.ts).
ARG STRATA_VERSION
ARG STRATA_SNAPSHOT_VERSION
ENV STRATA_VERSION=$STRATA_VERSION
ENV STRATA_SNAPSHOT_VERSION=$STRATA_SNAPSHOT_VERSION
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run postinstall
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Next's standalone server binds to this host; without 0.0.0.0 it listens on
# localhost only and Caddy's reverse_proxy would get connection refused (502).
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
