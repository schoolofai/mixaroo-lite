# Memory

## Project Context
- Product: mixaroo-lite
- My role: developer

## Team Composition
- lead: 1 agent
- developer: 1 agent
- qa: 1 agent
- content-writer: 1 agent

## Conventions
- Check .team/memory/conventions.md for project conventions
- Check .team/memory/lessons.md for learned lessons

## Pre-seeded Knowledge
- Stack: TypeScript + Commander.js + vitest, Node.js 18+
- Source: /work/src/ (cli.ts, commands/, services/, utils/)
- Tests: /work/tests/ and src/**/__tests__/
- Build: npm run build (tsconfig.build.json excludes tests)
- 238 tests passing at baseline
- NODE_ENV=development npm install (vitest is devDependency)