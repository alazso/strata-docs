# strata-docs

Documentation site for [Strata](https://github.com/alazso/strata), the shared library plugin for
alazso's Minecraft plugins. Built with [Next.js](https://nextjs.org) and
[Fumadocs](https://fumadocs.dev), served under the `/strata` base path
(homepage at `https://alaz.so/strata/`, docs at `https://alaz.so/strata/docs`).

Run the development server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000/strata> to view it. The app lives under the `/strata` base path, so the
bare root (`http://localhost:3000`) is intentionally a 404.

## How it ships

`.github/workflows/deploy.yml` builds the standalone Docker image on every push to `main`, stamping
the current Strata version (latest GitHub release plus `gradle.properties` snapshot) into the install
snippets, and pushes it to `ghcr.io/alazso/strata-docs:latest`. A reverse proxy serves it under
`/strata`.

## Layout

- `content/docs/*.mdx`: the documentation pages (`meta.json` defines the sidebar).
- `app/(home)`: the landing page.
- `app/docs`: the documentation layout and pages.
- `lib/shared.ts`: app name, routes, and GitHub config.
- `source.config.ts`: Fumadocs MDX config and the `STRATA_VERSION` token replacement.
