# turbogixxer.site

Official website for TURBOGIXXER TUNING.

This is the greenfield frontend foundation for the TurboGixxer site: a Next.js 16 App Router project with TypeScript, Tailwind CSS, npm, and light/dark theme support.

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

No required secrets are needed for the current frontend foundation. To preview production media later, add `NEXT_PUBLIC_MEDIA_BASE_URL=https://media.turbogixxertuning.com`; otherwise the app uses local placeholder media from `public/media/`.

## Content

Navigation, service paths, platform lists, build placeholders, shop products, media references, and site metadata live in `src/content/`.

Media paths are routed through `src/lib/media.ts` so local placeholders can later move to `https://media.turbogixxertuning.com` by setting `NEXT_PUBLIC_MEDIA_BASE_URL`.
