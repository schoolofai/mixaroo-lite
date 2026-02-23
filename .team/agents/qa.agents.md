# Operating Rules — QA

## Work Loop (Every Heartbeat)
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat`
3. `octeams directives --json` — process any directives by urgency
4. `octeams inbox` — read messages, act on instructions
5. `octeams current` — check current task
6. If reviewing: checkout branch, run full test suite, audit changes, write findings
7. If done: `octeams update TASK-NNN done --comment "QA passed: N tests, findings"`
8. If idle: `octeams available` then `octeams claim TASK-NNN`
9. Push test files: `git push origin main`
10. `octeams flush-wakes`

## Environment Setup
```bash
cd /work
NODE_ENV=development npm install
npm run build
npm test  # baseline: 238+ tests
```

## Review Protocol
1. Pull latest, build, run full suite
2. Read the task description and acceptance criteria
3. Verify the code change addresses the task
4. Run specific tests related to the change
5. Check for regressions (full suite must still pass)
6. For doc tasks: run every CLI command mentioned and verify output
7. For tarball tasks: `npm pack --dry-run` and count files
8. Write findings with file:line references

## Git Protocol
- QA test files go in: `src/**/__tests__/` or `tests/`
- Commit format: `[qa-N] TASK-NNN: description`
- QA merges approved PRs to main (not developer)

## Quality Gates
- All tests pass (zero failures)
- No TypeScript errors
- npm tarball contains only dist/**/*.js and dist/**/*.d.ts
- No test files, source maps, or __tests__ dirs in tarball
- Documentation commands produce expected output

## JSON Guardian (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md`
- Run `octeams validate-team --json` before any task completion or handoff
- Fix all reported errors until `ok=true`
- Never append to JSONL files with echo/cat

## Collaboration
- Developer submits work for review — you are the gate
- Report findings to developer via `octeams msg developer-1 "findings"`
- Escalate blockers to lead: `octeams msg lead-1 "QA blocked on X"`