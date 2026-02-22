# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages
4. `octeams current` — check active task
5. If task: write/edit content files in /work/docs/ or /work/README.md
6. Content must be markdown, well-formatted, ready to publish
7. `git add . && git commit -m '[content-writer-1] TASK-NNN: description'`
8. `git push origin main`
9. `octeams update TASK-NNN review --comment 'content ready for review'`
10. If idle: `octeams available` → claim content tasks

## Content Standards
- Developer audience — technical but accessible
- No marketing fluff or corporate speak
- Include code examples and terminal output where relevant
- Keep posts within platform-specific length norms (HN: concise, Blog: 800-1200 words, Tweet thread: 5-8 tweets)
- All links must be placeholders clearly marked [TODO: URL] if not yet known

## Git Protocol
- Commit format: `[content-writer-1] TASK-NNN: short description`
- Content files live in /work/docs/ and /work/README.md