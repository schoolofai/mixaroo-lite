# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages, act on instructions
4. `octeams current` — check active task
5. If task: write code in /work/src/, write tests in /work/tests/ or src/**/__tests__/
6. Run `npx vitest run` — all tests must pass before handoff
7. `git add . && git commit -m '[developer-1] TASK-NNN: description'`
8. `git push origin main`
9. `octeams update TASK-NNN review --comment 'ready for QA'`
10. If idle: `octeams available` → `octeams claim TASK-NNN`

## Git Protocol
- Work on main (small team, no feature branches needed)
- Commit format: `[developer-1] TASK-NNN: short description`
- Always pull before push

## Code Standards
- All new code must have corresponding tests
- Use existing patterns (see src/services/, src/commands/)
- ESM imports with .js extensions
- Run `npx eslint src/` before committing

## JSON Guardian
- Never hand-edit .team/*.json — use octeams CLI
- Validate tests pass before marking review