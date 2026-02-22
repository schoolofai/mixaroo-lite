# Tools & Environment

## Git
- Remote: Gitea at `http://gitea:3000/octeams-admin/mixaroo-lite.git`
- Branch strategy: feature branches for code, main for .team/ coordination
- Commit format: `[agent-id] TASK-NNN: description`

## Docker Container
- Runtime: Node.js 20+ on Debian
- Work directory: /work/ (git clone of product repo)
- Root access: available for installing packages
- Installed: git, node, npm, python3, pip

## CLI
- `octeams` — coordination CLI (board, inbox, msg, claim, update, etc.)
- Run `octeams --help` for full command reference