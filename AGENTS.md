# AGENTS.md

Guidance for coding agents working on the TurboGixxer frontend.

## Project Purpose

TurboGixxer is a high-end EFI tuning, dyno, wiring, Haltech, and service-commerce brand. This repository is the greenfield frontend foundation for the TurboGixxer site.

The first goal is a visually complete, maintainable frontend with:

- Reusable components for layout, cards, sections, forms, and calls to action.
- Centralized content for navigation, services, platforms, pricing, shop items, and proof points.
- Centralized media references so placeholder assets can be swapped for production media later.
- Clean, mobile-first responsive pages that feel intentional on small screens and premium on desktop.

This frontend should feel like a serious performance shop. It should not feel like a generic tuner template, a cluttered parts store, or a thin landing page wrapped around future work.

## Design Direction

The intended visual language is technical, premium, motorsport-focused, clean, and deliberate.

Use these traits as the baseline:

- Dark motorsport base.
- Graphite, black, and muted metal surfaces.
- Clean white typography with muted gray supporting text.
- Controlled teal accent for primary action, technical highlights, active states, and proof details.
- Optional muted gold accent for light sections, special highlights, or secondary emphasis.
- Strong condensed display headings with sharp hierarchy.
- Spacious layouts with clear section rhythm.
- Premium light card sections where useful, especially for service-commerce, proof, and technical summaries.
- Clean ECU/platform logo or capability grids.
- Large automotive media areas that carry the brand mood.
- Restrained motion that supports clarity rather than decoration.
- Service-commerce flow that makes deposits, consults, and intake feel trustworthy.

Provided mockups should be treated as design direction, not rigid pixel-perfect templates. Preserve the intent, hierarchy, and brand feel, but make practical frontend decisions when the implementation needs to evolve.

## Homepage Customer Journey

The homepage should guide a qualified customer from brand trust to technical intake.

1. **Hero**  
   Establish positioning, show strong automotive media, include clear CTAs, and present a proof rail such as years of experience, dyno capability, Haltech support, and remote support.

2. **Supported ECU / Platform Capability**  
   Show the systems and platforms TurboGixxer can support. Keep this clean and technical, not logo clutter.

3. **Process Section**  
   Explain how the work happens: inspect, log, calibrate, and drive or validate. The intent is to communicate discipline before power claims.

4. **Services Section**  
   Summarize primary service paths and starting prices. Help customers choose between dyno, remote, standalone, factory ECU, wiring, and Haltech-related support.

5. **Featured Build / Result Placeholder**  
   Provide a case-study area for future before/after numbers, technical summaries, and media.

6. **Gallery / Media Preview**  
   Show shop, dyno, wiring, logging, and build texture. Current media can be placeholder, but the layout should be ready for real assets.

7. **Deposit / Service-Commerce Section**  
   Present booking deposits, consults, and service starters without making the site feel like a generic ecommerce catalog.

8. **Final Contact CTA**  
   Drive users to the structured technical intake form and make it clear that build details matter.

9. **Footer**  
   Keep navigation, contact, and brand positioning accessible without adding clutter.

## Routes

Intended route structure:

- `/`
- `/services`
- `/tuning`
- `/wiring`
- `/haltech`
- `/builds`
- `/shop`
- `/contact`

Pages should be built as reusable frontend views using shared components and centralized content. Avoid copying one-off markup across route files when a section, card, or data model can be shared cleanly.

## Content Rules

Content should be technical, direct, minimal, and service-focused. Prefer specific service language over hype.

Use wording that communicates:

- Calibration discipline.
- Real-world drivability.
- Mechanical and electrical readiness.
- Data logging and validation.
- Clear service paths and expectations.

Important pricing and service facts:

- Dyno Tuning starts at **$750**.
- Remote Tuning starts at **$500**.
- Standalone ECU Setup starts at **$750**.
- Factory ECU Tuning starts at **$550**.
- Wiring / Harness Support starts at **$2,550**.
- Booking Deposit is **$200** and is applied toward approved service.
- The **$200 Booking Deposit must not be presented as the full dyno tuning price**.

When adding or editing pricing, update centralized content first and then consume that content in components.

## Media Handling

Media references should be centralized. Current media can use placeholders, but the structure should prepare for future delivery from:

```txt
https://media.turbogixxertuning.com
```

Avoid scattering image or video paths throughout components. Use the centralized media config or helper so future asset migration is simple.

Good media practices:

- Keep hero, build, gallery, and shop media paths in content/config or a media helper.
- Use stable aspect ratios for media-heavy components.
- Prefer real automotive/shop/dyno texture over abstract decorative graphics.
- Do not ship broken image placeholders or layout-shifting media containers.

## Suggested Structure

Preferred project structure:

```txt
src/
  app/
  components/
    layout/
    sections/
    ui/
    cards/
    forms/
    media/
  content/
  lib/
  styles/
```

If the project currently uses equivalent root-level folders, continue the existing pattern unless moving to `src/` clearly improves maintainability. Structure can evolve when there is a practical reason, but keep ownership boundaries obvious.

## Component Approach

Build reusable components and shared primitives. Exact names are not mandatory, but the system should remain consistent.

Useful component families include:

- `SiteHeader`
- `SiteFooter`
- `Container`
- `Section`
- `PageHeader`
- `Button`
- `Card`
- `Badge`
- `Eyebrow`
- `ServiceCard`
- `MediaCard`
- `StatCard`
- `ProcessStep`
- `PlatformLogoGrid`
- `BuildFeatureCard`
- `ShopItemCard`
- `ContactCTA`
- `PlaceholderMedia`

Prefer small, composable components over large route files. A route should mostly compose content and sections; repeated visual rules should live in shared components or utilities.

## Styling Guidance

Use Tailwind CSS consistently, supported by global tokens, theme extensions, or shared utility classes for common decisions.

Centralize or standardize:

- Backgrounds.
- Surface colors.
- Text colors.
- Muted text.
- Borders.
- Accent colors.
- Spacing.
- Section padding.
- Card styles.
- Buttons.
- Forms.
- Responsive behavior.
- Reduced motion support.

Keep the interface mobile-first. Verify that headings, buttons, proof rails, cards, and form fields remain readable and balanced on small screens.

Avoid:

- One-off color values scattered across many components.
- Overly rounded, playful, or generic SaaS styling.
- Dense ecommerce grids that bury the service intent.
- Decorative motion that distracts from technical credibility.

## Agent Workflow

Before editing:

- Inspect existing files and patterns.
- Identify where content, media, and shared components already live.
- Preserve the current design direction unless intentionally improving it.
- Keep changes scoped to the requested work.

While editing:

- Prefer centralized content/config over hardcoded repeated values.
- Keep mobile and desktop layouts in mind.
- Avoid adding backend integrations unless explicitly requested.
- Avoid introducing unnecessary dependencies.
- Use existing components and utilities before creating new ones.
- Keep placeholder media centralized and easy to replace.

Before finishing:

- Run validation commands.
- Check for obvious responsive layout issues.
- Note any assumptions, limitations, or follow-up recommendations.

## Validation Commands

Run:

```bash
npm run lint
npm run build
```

If the project includes a typecheck script, also run:

```bash
npm run typecheck
```

Use the package manager expected by the project. This repo targets Node 22 and npm, even if a local agent environment temporarily uses another tool for verification.

## Deliverable Expectations

Completed work should include:

- A concise summary of changed files.
- Validation results, including commands run and whether they passed.
- Known issues or follow-up recommendations.
- Any assumptions made.

Keep final notes direct and useful. Future agents should be able to understand what changed, why it changed, and what still needs attention.
