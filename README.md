# Mub Music

Next.js App Router site for music news, product discovery, offers, and reviews.

## Requirements

- Node.js 20+ (recommended)
- npm (comes with Node)

## Setup

1. Clone the repo and install dependencies:

```bash
cd mub-music
npm install
```

2. Create a local env file (`.env.local` is gitignored). Example:

```bash
NEXT_PUBLIC_ENV_DOMAIN=mubmusic.com
ENV_API_ROOT_PATH=ASK_FOR_IT
ENV_MEDIA_ROOT_PATH=ASK_FOR_IT
ENV_API_USER=ASK_FOR_IT
ENV_API_PASSWORD=ASK_FOR_IT
```

| Variable                 | Used for                                                                     |
| ------------------------ | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ENV_DOMAIN` | Canonical / Open Graph / sitemap URLs (public)                               |
| `ENV_API_ROOT_PATH`      | GraphQL host (server-only; Apollo uses `https://$ENV_API_ROOT_PATH/graphql`) |
| `ENV_MEDIA_ROOT_PATH`    | Allowed `next/image` remote host (`images.remotePatterns`)                   |
| `ENV_API_USER`           | GraphQL API username for server-side Basic auth (server-only)                |
| `ENV_API_PASSWORD`       | GraphQL API application password for server-side Basic auth (server-only)    |

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start Next.js in development          |
| `npm run build`        | Production build                      |
| `npm start`            | Serve the production build            |
| `npm test`             | Run Jest with coverage                |
| `npm run check-format` | Prettier check                        |
| `npm run check-lint`   | ESLint                                |
| `npm run check-types`  | TypeScript (`tsc --noEmit`)           |
| `npm run test-all`     | Format + lint + types + tests + build |

## Project notes

- Package manager is **npm** (`package-lock.json`). Do not use Yarn or others for this repo.
- Install uses `.npmrc` with `legacy-peer-deps=true` so peer ranges match the existing React 19 stack.
- Browser data fetching goes through Next.js Route Handlers under `app/api/` (e.g. product search). Server Components call GraphQL via `services/` directly.
- Coding conventions live in [`rules.md`](./rules.md).

## Branch rules

- Features: feat/branch-name
- Bugs: bugfix/branch-name
- Hot fixes: hotfix/branch-name
- Security: security/branch-name
- Documentation: doc/branch-name
- Analytics: analytics/branch-name

## License

Copyright 2026 Mub Music.

This project is licensed under the
[PolyForm Noncommercial License 1.0.0](./LICENSE).
You may view, clone, modify, and redistribute it for
**noncommercial** purposes only. Commercial use requires
permission from the copyright holder.
