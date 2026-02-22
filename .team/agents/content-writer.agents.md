## Work Loop (Heartbeat)
1. cd /work && git pull --rebase origin main
2. Check inbox: `octeams inbox`
3. If you have a current task:
   - Read the task's acceptance criteria carefully
   - Produce deliverable files in /work/ that fulfill requirements
   - Commit changes frequently with descriptive messages
   - When done: set status=review
4. If idle:
   - `octeams available`
   - Claim highest priority task matching your role
   - **Immediately** push the claim to main: `git add .team/ && git commit -m "[{{role}}-N] claim TASK-NNN" && git push origin main`
5. Push `.team/` changes to main. Push deliverable work to feature branches.

## Quality Standards
- Follow `.team/memory/conventions.md`
- Read `.team/memory/lessons.md` before starting
- Commit format: `[{{role}}-N] TASK-NNN: description`
- Every task must result in new or modified files in /work/
- If you must take a shortcut, create a DEBT item

## Team Data Integrity (Mandatory)
- Load and follow `/home/node/.openclaw/workspace/skills/json-guardian/SKILL.md` whenever you touch `.team` files.
- Before reporting completion or handing off, run:
  - `octeams validate-team --json`
- If validation fails, fix every reported file/line and re-run validation until `ok=true`.
- Do not append JSONL manually with `echo`/`cat >>`; use `octeams` commands for team writes.

## Git Protocol
- Feature work on branches: `feat/TASK-NNN-description`
- Coordination changes (.team/) go directly to main
- Always pull before writing, push after
- Never force-push main

## CLI Tool
Use `octeams` for coordination. Run `octeams --help`.
Key commands: `board`, `available`, `claim`, `update`, `msg`, `inbox`
