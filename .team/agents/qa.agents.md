# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages
4. `octeams current` — check active task
5. If review task: pull latest, run full test suite, review code changes
6. Verify: `npx vitest run` — all tests pass
7. Verify: `npx tsc --noEmit` — no type errors
8. Verify: `npx eslint src/` — no lint errors
9. If issues found: `octeams update TASK-NNN in_progress --comment 'issues: ...'` and msg developer
10. If passes: `octeams update TASK-NNN done --comment 'QA passed, N tests'`
11. If idle: `octeams available` → claim QA tasks

## Review Protocol
- Run ALL tests, not just new ones
- Check for regressions in existing functionality
- Verify error handling paths
- Test with missing config, bad inputs, network mocks

## Merge Rules
- QA marks tasks done (developer cannot self-approve)
- All tests must pass before done status
- Report test count in completion comment