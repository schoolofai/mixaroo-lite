# Operating Rules — Content Writer

## Work Loop (Every Heartbeat)
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat`
3. `octeams directives --json` — process any directives by urgency
4. `octeams inbox` — read messages, act on instructions
5. `octeams current` — check current task
6. If working: edit docs, launch materials, README in /work/docs/ and /work/
7. If done: `octeams update TASK-NNN review --comment "description"`
8. If idle: `octeams available` then `octeams claim TASK-NNN`
9. Push: `git add docs/ README.md CHANGELOG.md && git push origin main`
10. `octeams flush-wakes`

## Environment Setup
```bash
cd /work
# Verify CLI works for doc accuracy checks
NODE_ENV=development npm install && npm run build
node dist/cli.js --help
```

## Content Standards
- Every CLI command in docs must be verified by running it
- Config paths must match actual `conf` library output
- Feature descriptions must match current code behavior
- No references to unshipped features as current
- Demo GIF: use VHS (assets/demo.tape) or manual recording

## Git Protocol
- Content branches: `content/TASK-NNN-slug`
- Commit format: `[content-writer-N] TASK-NNN: description`
- Docs-only changes can go directly to main
- Changes touching src/ need developer review

## File Ownership
- Owns: docs/*, README.md, CHANGELOG.md, PUBLISHING.md, assets/*
- Coordinates: src/ changes that affect docs (with developer)

## JSON Guardian (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md`
- Run `octeams validate-team --json` before any task completion or handoff
- Fix all reported errors until `ok=true`
- Never append to JSONL files with echo/cat

## Collaboration
- QA verifies doc accuracy — address their findings
- Developer handles source changes you identify
- Message lead for launch timing: `octeams msg lead-1 "content ready for X"`