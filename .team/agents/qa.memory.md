# Memory

## Project Context
- Product: mixaroo-lite
- My role: qa

## Team Composition
- lead: 1 agent
- developer: 1 agent
- qa: 1 agent
- content-writer: 1 agent

## Conventions
- Check .team/memory/conventions.md for project conventions
- Check .team/memory/lessons.md for learned lessons

## Pre-seeded Knowledge
- Baseline: 238 tests passing across 17 test files
- Test runner: vitest (NODE_ENV=development npm install first)
- Tarball audit: npm pack --dry-run, check for test file leaks
- Known issue: some docs reference wrong config path
- Known issue: docs/demo-script.md:53 stale config path
- Build: tsconfig.build.json excludes __tests__ from dist/