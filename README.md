# turbogixxer.site

Official website for TURBOGIXXER TUNING.

This is the greenfield frontend foundation for the TurboGixxer site: a Next.js 16 App Router project with TypeScript, Tailwind CSS, npm, and light/dark theme support.

## Environment

Use Node 22.x with npm 10.x. The repo includes `.nvmrc`, a pinned `packageManager`, and npm engine checks so installs fail early under the wrong local toolchain.

## Package Manager

This repo is npm-based. Use `npm install` and keep `package-lock.json` committed. Do not add pnpm or Yarn lockfiles unless the project intentionally changes package managers.

## Scripts

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run build` creates a production build.
- `npm run validate` runs lint, typecheck, and build in sequence.

## Cloud Environment

This repo targets Node 22 and npm. In Codex cloud environment settings, pin Node from `.nvmrc` and use these commands:

- Setup script: `npm run setup:cloud`
- Maintenance script: `npm run maintain:cloud`
- Validation command for agents/CI: `npm run validate`

No required secrets are needed for the current frontend foundation. Public media is served through `NEXT_PUBLIC_MEDIA_BASE_URL=https://media.turbogixxertuning.com`.

## Content

Navigation, service paths, platform lists, build placeholders, shop products, media references, and site metadata live in `src/content/`.

Media paths are routed through `src/lib/media.ts` so components consume centralized CDN paths instead of raw S3 or scattered hardcoded URLs.

## Plans

- `docs/product-integration-plan.md` captures the v1 shop product, Stripe Checkout, and order-record plan.
