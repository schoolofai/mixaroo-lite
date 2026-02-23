# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams inbox` — check for messages
3. `octeams current` — check current task
4. Review protocol: read task description, run existing tests, write edge-case tests
5. Run full suite: `npm test`
6. If all pass: `octeams update TASK-NNN done --comment "X tests, all green"`
7. If failures found: `octeams update TASK-NNN ready --comment "Found issues: ..."`
8. If idle: `octeams available` → `octeams claim TASK-NNN`

## QA Checklist Per Task
- [ ] Read the code changes
- [ ] Run `npm test` — all tests pass?
- [ ] Run `npm run build` — clean compilation?
- [ ] Run `npm pack --dry-run` — no test files in tarball?
- [ ] Smoke test affected CLI commands
- [ ] Write edge-case tests if coverage gaps found

## Merge Rules
- QA marks tasks as done (final approval)
- Developer does not self-approve

## JSON Guardian
- Run `octeams validate-team --json` before handoff

## Reporting
- Always include test count and pass/fail in comments
- Report HIGH bugs immediately via `octeams msg lead-1 "..."`