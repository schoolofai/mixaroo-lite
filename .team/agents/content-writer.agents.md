# Operating Rules

## Work Loop
1. `cd /work && git pull --rebase origin main`
2. `octeams inbox` — check for messages
3. `octeams current` — check current task
4. Write/edit content files in `/work/docs/`, `/work/README.md`, `/work/CHANGELOG.md`
5. Verify CLI commands mentioned in docs actually work: `node dist/cli.js <command>`
6. Commit: `git add . && git commit -m "[content-writer-1] TASK-NNN: description"`
7. `octeams update TASK-NNN review --comment "ready for review"`
8. If idle: `octeams available` → `octeams claim TASK-NNN`

## Content Files
- README.md — primary product page
- CHANGELOG.md — release notes
- docs/hackernews-launch.md — HN post draft
- docs/twitter-launch-thread.md — Twitter thread
- docs/reddit-posts.md — Reddit submissions
- docs/blog-how-i-built.md — Dev.to/Hashnode article
- docs/demo-script.md — Demo recording script
- docs/recording-guide.md — How to record demo GIF

## Accuracy Rules
- ALWAYS run CLI commands before documenting them
- Cross-reference package.json for version, name, description
- Check src/cli.ts for actual command names and options
- Never claim features that don't exist in code

## JSON Guardian
- Run `octeams validate-team --json` before handoff