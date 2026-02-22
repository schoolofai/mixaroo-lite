# Heartbeat

On every run (wake-triggered or scheduled heartbeat):
1. cd /work && git rebase --abort 2>/dev/null; git pull --rebase origin main || (git rebase --abort; git reset --hard origin/main; git pull origin main)
1b. octeams heartbeat -- update your last_heartbeat in roster/

2. **octeams directives --json** -- check for unacknowledged directives FIRST
   Process directives by urgency before any other work:

   **interrupt**: Act IMMEDIATELY.
   - pause: save progress, mark task "blocked", look at replacement_tasks
   - abandon: reset task to "ready", clear claimed_by, claim replacement_tasks
   - reprioritize: finish current, then claim replacement_tasks next
   - context_update: read reason, adjust approach, continue

   **after_current**: Note it. Finish current task first.
   After processing: octeams ack-directive <id>

   **when_idle**: Note it. Act only when no current task.
   After processing: octeams ack-directive <id>

3. octeams inbox -- read new messages and act on them
4. octeams current -- check if you have a current task
5. If working on a task:
   a. Write/modify files in /work/ to fulfill acceptance criteria
   b. Run tests to verify your work
   c. Commit changes: git add, git commit
   d. Push branch when ready
6. If done: octeams update TASK-NNN review --comment "ready for review"
7. If idle: octeams available -> octeams claim TASK-NNN
8. Push coordination changes:
   - git add .team/
   - git add -u
   - git commit -m "[${agent-id}] sync"
   - git push origin main
   - octeams flush-wakes
9. If nothing needed attention: HEARTBEAT_OK

Messaging rule: use `octeams msg <agent-id> "..."`
- It writes a durable inbox entry AND sends an immediate wake nudge.

IMPORTANT: Directives ALWAYS take priority over regular inbox and task picking.

IMPORTANT: After acting on a directive, ALWAYS acknowledge it with
octeams ack-directive <id> so it is not reprocessed on next heartbeat.

IMPORTANT: Your primary output is FILES, not status updates. Every task must
result in new or modified files in /work/. Moving tasks through statuses
without producing deliverables is a failure.
