# AGENTS.md

This repository is designed for parallel Codex/agent work using isolated git worktrees. Each conversation owns its task end-to-end: investigate, implement, validate, commit, push, merge, and clean up.

## Operating Principles

- One conversation = one owner for one task.
- Do not do feature work directly on `main`.
- Use one git worktree and one branch per task.
- Keep the user-opened checkout as a control/integration workspace unless instructed otherwise.
- Do not overwrite or revert user changes unless explicitly asked.
- Do not commit secrets, tokens, cookies, `.env` contents, credentials, or private keys.
- Prefer small, focused commits.
- Run validation before merging.
- If deployment is required for the project, deploy only after the change is merged to `origin/main`.

## Worktree Strategy

Default branch naming:

```bash
codex/<task-slug>
```

Default worktree naming:

```bash
../<repo-name>-codex-<task-slug>
```

Example:

```bash
git fetch origin --prune
git worktree add ../myrepo-codex-fix-login -b codex/fix-login origin/main
```

If a branch name already exists, choose a unique suffix:

```bash
codex/fix-login-v2
```

## Starting A New Task

From the control checkout:

```bash
git status --porcelain
git fetch origin --prune
git worktree add ../<repo-name>-codex-<task-slug> -b codex/<task-slug> origin/main
```

Then work only inside the new task worktree:

```bash
cd ../<repo-name>-codex-<task-slug>
```

## Implementation Rules

- Read the existing code before editing.
- Follow existing project patterns.
- Keep changes scoped to the task.
- Avoid unrelated refactors.
- Add or update tests when behavior changes.
- Do not modify generated files unless the project expects that.
- If user changes are present, preserve them and work around them.

## Validation

Run the project's relevant validation commands before merge.

Customize this section per repo, for example:

```bash
npm test
npm run lint
npm run build
```

or:

```bash
pnpm test
pnpm run typecheck
pnpm run build
```

or:

```bash
pytest
ruff check .
mypy .
```

If validation cannot be run, clearly state why.

## Committing

Check changes:

```bash
git status --short
git diff
```

Stage only relevant files:

```bash
git add <files>
```

Commit with a concise message:

```bash
git commit -m "Fix login redirect handling"
```

Use conventional commits only if the repo already follows that style.

## Pushing The Task Branch

Push the task branch for backup/collaboration:

```bash
git push -u origin HEAD
```

If the branch was rebased after pushing:

```bash
git push --force-with-lease
```

Use `--force-with-lease`, not plain `--force`.

## Rebasing Before Merge

Before merging, update against latest `origin/main`:

```bash
git fetch origin --prune
git rebase origin/main
```

Resolve conflicts if needed, then rerun validation.

If the branch was already pushed:

```bash
git push --force-with-lease
```

## Merging To Main

Use a clean integration checkout or main worktree.

If one does not exist, create it once:

```bash
git worktree add ../<repo-name>-main-ff main
```

Then merge:

```bash
cd ../<repo-name>-main-ff
git switch main
git pull --ff-only origin main
git merge --ff-only codex/<task-slug>
git push origin main
```

Only use fast-forward merges unless the user explicitly asks otherwise.

## Handling Push Conflicts

If pushing `main` is rejected because `origin/main` changed:

```bash
cd ../<repo-name>-codex-<task-slug>
git fetch origin --prune
git rebase origin/main
```

Rerun validation, then update the pushed task branch if needed:

```bash
git push --force-with-lease
```

Then retry the fast-forward merge from the integration checkout:

```bash
cd ../<repo-name>-main-ff
git switch main
git pull --ff-only origin main
git merge --ff-only codex/<task-slug>
git push origin main
```

## Updating The Control Checkout

After pushing to `origin/main`, update the control checkout only if clean:

```bash
cd /path/to/control/checkout
git status --porcelain
git pull --ff-only origin main
```

If the control checkout has uncommitted changes, do not discard them. Ask the user how to proceed.

## Deployment

If the project requires deployment after merge, deploy only after `origin/main` has been updated.

Customize this section per repo.

Example placeholder:

```bash
# Build production artifact
npm run build

# Deploy using the project's normal deploy command
npm run deploy
```

For production or destructive operations, ask for explicit confirmation unless the repo instructions say otherwise.

## Cleanup

After successful merge and push, remove the task worktree:

```bash
cd /path/to/control/or/main/checkout
git worktree remove ../<repo-name>-codex-<task-slug>
git branch -d codex/<task-slug>
```

Optionally delete the remote task branch:

```bash
git push origin --delete codex/<task-slug>
```

Keep a task worktree only if the user explicitly asks to preserve it for follow-up.

## Review Requests

When asked for a review, prioritize:

- Bugs
- Regressions
- Security risks
- Data loss risks
- Missing validation
- Missing tests

Lead with findings and include file/line references where possible.

## Communication

While working:

- Give short progress updates.
- Mention blockers clearly.
- Do not claim work is complete until validation, merge, and any required deployment are done.
- If something could not be validated, say so plainly.

## Safety Rules

Never run destructive commands unless explicitly requested:

```bash
git reset --hard
git checkout -- <file>
git clean -fd
rm -rf
```