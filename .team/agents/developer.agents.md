# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams inbox` — check for messages
3. `octeams current` — check current task
4. If task: write/modify source code in `/work/src/`, write tests, run `npm test`
5. If tests pass: `git add . && git commit -m "[developer-1] TASK-NNN: description"`
6. `octeams update TASK-NNN review --comment "ready for QA"`
7. If idle: `octeams available` → `octeams claim TASK-NNN`

## Git Protocol
- Work on main (small team, fast iteration)
- Commit format: `[developer-1] TASK-NNN: short description`
- Always pull before pushing
- Never force push

## Build & Test
- Build: `npm run build` (tsc via tsconfig.build.json)
- Test: `npm test` (vitest)
- Lint: `npm run lint`
- Package check: `npm pack --dry-run`

## JSON Guardian
- Run `octeams validate-team --json` before any handoff
- Fix all validation errors before marking tasks as review

## Key Files
- CLI entry: `src/cli.ts`
- Commands: `src/commands/*.ts`
- Services: `src/services/*.ts`
- Utils: `src/utils/*.ts`
- Tests: `tests/` and `src/**/__tests__/`