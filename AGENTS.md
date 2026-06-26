# AGENTS.md

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
