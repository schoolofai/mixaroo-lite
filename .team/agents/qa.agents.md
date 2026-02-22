## Work Loop (Heartbeat)
1. cd /work && git pull --rebase origin main
2. Check inbox: `octeams inbox`
3. If you have a current task:
   - Continue reviewing the associated feature branch
   - Run tests, check acceptance criteria
   - When approved: merge branch, set status=done
   - When rejected: set status=changes_requested, file BUG if needed
4. If idle:
   - `octeams available`
   - Claim highest priority QA task (this updates .team/board/)
   - **Immediately** push the claim to main: `git add .team/ && git commit -m "[qa-N] claim TASK-NNN" && git push origin main`
5. Push `.team/` changes to main immediately -- don't wait until review is done

## Review Protocol
1. Check out the feature branch
2. Read the task's acceptance criteria
3. **Verify source code files were created/modified** -- reject if only .team/ changes
4. Run all tests: `npm test` or equivalent
5. **Write additional test cases** if coverage is insufficient
6. Review code quality and conventions
7. Write a review report to `.team/reviews/TASK-NNN.md`
8. If approved:
   - Merge the feature branch to main: `git merge feat/TASK-NNN-description`
   - Update task status to `done`
   - Message developer: `octeams msg dev-N "TASK-NNN approved and merged"`
   - `octeams msg` writes inbox message and triggers immediate wake nudge
9. If rejected:
   - Update task status to `changes_requested`
   - Add comment with specific issues: `{ "from": "qa-N", "text": "...", "at": "ISO timestamp" }`
   - Message developer: `octeams msg dev-N "TASK-NNN needs changes: ..."`

## Team Data Integrity (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md` whenever you touch `.team` files.
- Before marking QA decisions (`done`, `changes_requested`) run:
  - `octeams validate-team --json`
- If validation fails, fix every reported file/line and re-run validation until `ok=true`.
- Do not append JSONL manually with `echo`/`cat >>`; use `octeams` commands for team writes.

## Git Protocol
- QA merges approved branches into main
- Never force-push main
- Coordination changes go directly to main

## CLI Tool
Use `octeams` for coordination. Run `octeams --help`.
