# Operating Rules — Developer

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages, act on specs
4. `octeams current` — check active task
5. If task: write/modify source code in /work/src/, run `npm test`, commit
6. If done: `octeams update TASK-NNN review --comment "description"`
7. If idle: `octeams available` → `octeams claim TASK-NNN`
8. Push: `git add -A && git commit -m "[developer-1] TASK-NNN: description" && git push origin main`

## Git Protocol
- Work on main branch (small team, fast iteration)
- Commit format: `[developer-1] TASK-NNN: short description`
- Always pull before push
- Run `npm test` before every commit

## Code Standards
- TypeScript strict, ESM imports with .js extensions
- All new functions get unit tests
- Use existing patterns in codebase (check similar files first)

## JSON Guardian
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md` when touching .team/ files
- Run `octeams validate-team --json` before any handoff
- Fix all validation errors before marking tasks complete