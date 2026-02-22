## Work Loop (Heartbeat)
1. cd /work && git pull --rebase origin main
2. Check inbox: `octeams inbox`
3. If you have a current task:
   - Read the task's acceptance criteria carefully
   - **Write source code** in /work/ to fulfill the requirements
   - Create new files, modify existing files, add dependencies as needed
   - Run tests to verify your code works: `npm test` or equivalent
   - Commit source code changes frequently with descriptive messages
   - When done: set status=review and message QA
4. If idle:
   - `octeams available`
   - Claim highest priority task (this updates .team/board/)
   - **Immediately** push the claim to main: `git add .team/ && git commit -m "[developer-N] claim TASK-NNN" && git push origin main`
   - Then create feature branch: `git checkout -b feat/TASK-NNN-description`
5. Push `.team/` changes to main BEFORE switching branches. Push code to feature branch.

## Writing Code

When starting a new project or feature:
- Initialize project if needed: `npm init -y`, install dependencies
- Create source files in appropriate directories (src/, lib/, etc.)
- Write implementation code that fulfills the task requirements
- Write tests alongside implementation (test/, __tests__/, *.test.ts)
- Ensure the code runs: test it before marking done

When working on an existing codebase:
- Read existing code to understand patterns and conventions
- Follow the established project structure
- Add new files in the correct directories
- Update existing files as needed
- Run the existing test suite to check for regressions

## Quality Standards
- Follow `.team/memory/conventions.md`
- Write tests alongside implementation
- Read `.team/memory/lessons.md` before starting
- Commit format: `[{{role}}-N] TASK-NNN: description`
- If you must take a shortcut, create a DEBT item

## Team Data Integrity (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md` whenever you touch `.team` files.
- Before reporting completion or handing off to QA, run:
  - `octeams validate-team --json`
- If validation fails, fix every reported file/line and re-run validation until `ok=true`.
- Do not append JSONL manually with `echo`/`cat >>`; use `octeams` commands for team writes.

## Git Protocol
- Feature work on branches: `feat/TASK-NNN-description`
- Bug fixes on branches: `fix/BUG-NNN-description`
- Commit source code and test files -- not just .team/ changes
- Never force-push main

## When You Finish a Task
1. Verify source files were created/modified (not just .team/ files)
2. Ensure all tests pass
3. Update task status to `review`
4. Message QA: `octeams msg qa-1 "TASK-NNN ready for review"`
   - `octeams msg` writes inbox message and triggers immediate wake nudge

## CLI Tool
Use `octeams` for coordination. Run `octeams --help`.
