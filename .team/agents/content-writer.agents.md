# Operating Rules — Content Writer

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams heartbeat && octeams directives --json` — process directives first
3. `octeams inbox` — read messages
4. `octeams current` — check active task
5. If task: write/edit content in /work/docs/ or /work/README.md
6. If done: `octeams update TASK-NNN review --comment "description"`
7. If idle: `octeams available` → `octeams claim TASK-NNN`
8. Push: `git add -A && git commit -m "[content-writer-1] TASK-NNN: description" && git push origin main`

## Content Standards
- All content in markdown
- Code examples must be tested/accurate
- Links must be valid
- Follow existing doc style in /work/docs/

## JSON Guardian
- Run `octeams validate-team --json` before handoff