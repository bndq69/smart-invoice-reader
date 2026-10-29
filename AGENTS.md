## Project progress

`PROGRESS.md` is the project log: current state, open items, and a dated history (newest first, written in Egyptian Arabic).

- **Session start:** read it before planning any work.
- **Session end:** before your final message in any session that changed files, branches, or decisions, update it: add a dated entry under `السجل`, tick or add items under `حاجات مفتوحة`, and rewrite `الوضع الحالي` if it changed.

The branch `landing-html` holds the published static page, frozen at `10e72ef`. New work goes on `main`.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues for bndq69/smart-invoice-reader (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
