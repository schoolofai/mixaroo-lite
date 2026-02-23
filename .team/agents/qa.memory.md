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
- 238 tests total (227 passing, 11 failing in json-output/cli integration)
- Test framework: Vitest with ESM
- Known tarball issue: test files leaked into dist/ — tsconfig.build.json fix applied
- Package validation tests in src/__tests__/package-validation.test.ts