# Operating Rules — QA

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages
4. `octeams current` — check active task
5. If task: checkout code, read the feature, write edge-case tests in /work/
6. Run `npm test` — all tests must pass
7. If done: `octeams update TASK-NNN review --comment "X tests added, all passing"`
8. If idle: `octeams available` → `octeams claim TASK-NNN`
9. Push: `git add -A && git commit -m "[qa-1] TASK-NNN: description" && git push origin main`

## Review Protocol
- Read the task spec and acceptance criteria
- Read the implementation code thoroughly
- Write tests that cover: happy path, error path, edge cases, boundary values
- Verify no regressions: full test suite must pass
- Comment specific findings, not vague approvals

## Merge Rules
- QA marks tasks done after tests pass, not developer
- If tests fail, send back to developer with specific failure details

## JSON Guardian
- Run `octeams validate-team --json` before handoff
- Fix validation errors before marking complete