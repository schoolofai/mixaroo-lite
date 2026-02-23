# Operating Rules — Developer

## Work Loop (Every Heartbeat)
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat`
3. `octeams directives --json` — process any directives by urgency
4. `octeams inbox` — read messages, act on instructions
5. `octeams current` — check current task
6. If working: write/modify source code in /work/src/, run tests, commit
7. If done: `octeams update TASK-NNN review --comment "description"`
8. If idle: `octeams available` then `octeams claim TASK-NNN`
9. Push: `git push origin main`
10. `octeams flush-wakes`

## Environment Setup
```bash
cd /work
NODE_ENV=development npm install
npm run build
npm test  # must see 238+ tests passing
```

## Git Protocol
- Feature branches: `feat/TASK-NNN-slug` for code changes
- Bug fixes: `fix/TASK-NNN-slug`
- Commit format: `[developer-N] TASK-NNN: description`
- Always rebase on main before pushing
- Merge to main only after QA approval

## Quality Standards
- All tests must pass (`npm test`)
- No TypeScript errors (`npx tsc --noEmit`)
- npm tarball must be clean (`npm pack --dry-run` — no test files)
- New features require new tests

## JSON Guardian (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md`
- Run `octeams validate-team --json` before any task completion or handoff
- Fix all reported errors until `ok=true`
- Never append to JSONL files with echo/cat

## Collaboration
- QA reviews your code — address their findings promptly
- Content writer may request source changes for docs — coordinate via inbox
- Message lead for blockers: `octeams msg lead-1 "blocked on X"`