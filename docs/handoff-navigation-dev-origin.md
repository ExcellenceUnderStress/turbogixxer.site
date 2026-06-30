# Navigation Dev Origin Handoff

Date: 2026-06-30
Repo: `/Users/hhhh/Documents/GitHub/turbogixxer.site`

## What We Accomplished

The issue was narrowed from "navigation and pages are broken" to a local development browser problem:

- Server-rendered pages were loading.
- Normal links, such as the homepage "View Services" link, could navigate.
- Hydrated client controls were not responding in the in-app browser before the fix. This affected controls such as the mobile hamburger menu, cart button, theme button, and desktop Services dropdown.

The Next dev log showed the cause:

```text
Blocked cross-origin request to Next.js dev resource /_next/webpack-hmr from "127.0.0.1".
```

Next recommended allowing the local dev origin in `next.config.js` / `next.config.mjs`.

## Fix Applied

Updated `next.config.mjs`:

```js
allowedDevOrigins: ["127.0.0.1"],
```

Committed and pushed:

- `d7788c5 Allow local dev origin`

## Validation Completed

Commands run successfully:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Dev server restarted from the control checkout:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Browser QA after restart:

- `/` loads at `http://127.0.0.1:3000/`
- No framework overlay
- No browser console warnings or errors observed during the nav checks
- Desktop Services dropdown opens and shows:
  - Dyno Tuning
  - Remote Tuning
  - Wire Harnesses
  - Track Support
  - Not Sure?
- Mobile hamburger menu opens
- Mobile Services link navigates to `/services`
- Cart drawer opens

## Next Steps

1. Keep the local browser on `http://127.0.0.1:3000/` while this dev server is running.
2. Re-test the main nav pages from the UI: Home, Services, Builds, Shop, Request Tuning.
3. Re-test service submenu links: Dyno Tuning, Remote Tuning, Wire Harnesses, Track Support, Not Sure?
4. If controls stop responding again, inspect `.next/dev/logs/next-development.log` first for dev-origin or HMR warnings.
5. If using `localhost` instead of `127.0.0.1` produces the same warning, add `localhost` to `allowedDevOrigins` in a separate scoped change.
6. Restart the dev server after any `next.config.mjs` change; Next does not reliably pick up config changes without a restart.

