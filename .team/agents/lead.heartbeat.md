# Heartbeat

On every run (wake-triggered or scheduled heartbeat):
1. cd /work && git rebase --abort 2>/dev/null; git pull --rebase origin main || (git rebase --abort; git reset --hard origin/main; git pull origin main)
1b. octeams heartbeat -- update your last_heartbeat in roster/

2. **octeams directives --json** -- check for unacknowledged directives FIRST
   If you have unacknowledged directives, process them by urgency:

   **interrupt**: Act IMMEDIATELY before doing anything else.
   - If action=pause: save progress, update current task to "blocked"
     with comment "[directive] {reason}", look at replacement_tasks
   - If action=abandon: update current task to "ready", set claimed_by null,
     then claim and start replacement_tasks
   - If action=reprioritize: note replacement_tasks, finish current task,
     then claim replacement_tasks next (skip octeams available)
   - If action=context_update: read reason, adjust approach, continue

   **after_current**: Note directive. Finish current task. Then act before
   checking octeams available. After processing: octeams ack-directive <id>

   **when_idle**: Note directive. Only act when no current task and no
   after_current directives pending. After processing: octeams ack-directive <id>

3. octeams inbox -- read new messages
4. **If you received new inbox messages, ACT on them according to your role (see SOUL.md):**
   - Lead: decompose specs into tasks -- write JSON files to .team/board/, then git add, commit, push
   - Developer: review instructions, claim available tasks
   - QA: review test requests, claim available QA tasks
5. octeams current -- check if you have a current task
6. If working on a task:
   a. Write/modify SOURCE CODE in /work/ (create files, implement features, write tests)
   b. Run tests to verify your code works
   c. Commit source code changes: git add, git commit
   d. Push branch when ready
7. If done: octeams update TASK-NNN review --comment "ready for QA"
8. If idle and no inbox messages to process: octeams available -> octeams claim TASK-NNN
9. Push coordination + lifecycle artifacts:
   - git add .team/ deliverables/ 2>/dev/null || git add .team/
   - git add -u
   - git commit -m "[${agent-id}] sync"
   - git push origin main
   - octeams flush-wakes
   IMPORTANT: ensure .team/ and deliverables/ updates are committed together
   during lifecycle preparation so host readiness can observe artifacts.
10. **Telegram status update**: If you have status to report or a recommendation
    for the CEO, compose your reply as a clear, mobile-friendly status digest.
    OpenClaw delivers non-HEARTBEAT_OK replies to Telegram automatically. Include:
    - Current phase and what hat you're wearing
    - Team activity summary (who's working on what, blockers)
    - Key progress since last heartbeat
    - **Concrete next-step recommendation** with options if applicable
    - "Reply here to approve/redirect"
11. If genuinely nothing has changed since last notification: HEARTBEAT_OK

Messaging rule: use `octeams msg <agent-id> "..."`
- It writes a durable inbox entry AND sends an immediate wake nudge.
- Do not wait for "next heartbeat" when delegating work.

IMPORTANT: Directives from the lead ALWAYS take priority over regular inbox
messages and available task picking.

IMPORTANT: After acting on a directive, ALWAYS acknowledge it with
octeams ack-directive <id> so it is not reprocessed on next heartbeat.

IMPORTANT: Your primary output is SOURCE CODE, not status updates. Every task must result
in new or modified files in /work/ (outside .team/). Moving tasks through statuses without
writing code is a failure.

IMPORTANT: Inbox messages with specs or requirements ALWAYS need attention -- decompose them
into tasks, do NOT reply HEARTBEAT_OK when you have unprocessed inbox messages.
