# Pre-Flight Checklist — mixaroo-lite v1.0.0

**Date:** 2026-02-23 | **Status:** IN PROGRESS

---

## 🔴 Blockers (Must Fix Before Publish)

- [ ] **npm tarball leaks test files** — 44 test files compiled into dist/ via tsc. Fix: tsconfig.build.json excludes `__tests__` dirs (TASK-033 addressed this — verify)
- [ ] **11 test failures** — `json-output.test.ts` and `cli.test.ts` fail (need `npm run build` before integration tests)
- [ ] **npm audit: 18 vulnerabilities** (5 moderate, 13 high) — Run `npm audit fix`, evaluate breaking changes
- [ ] **Documentation accuracy** — 7 issues found by QA (TASK-031): wrong default length (25→30), wrong config path, nonexistent `config get` subcommand referenced

## 🟡 Should Fix Before Launch

- [ ] **Demo GIF** — README has placeholder, need actual recording (guide: `docs/recording-guide.md`)
- [ ] **CHANGELOG date** — Says 2026-02-20, confirm or update
- [ ] **Blog post accuracy** — Claims ~500 lines but source is ~1,700; roadmap lists save/load as future but it's shipped
- [ ] **CI pipeline** — `.github/workflows/ci.yml` exists but verify it passes on GitHub

## 🟢 Nice to Have

- [ ] **npm audit fix --force** — Address all 18 vulnerabilities
- [ ] **Add LICENSE file** — package.json says MIT but no LICENSE file in repo
- [ ] **Author field** — package.json `author` is empty
- [ ] **Repository field** — Add `repository` to package.json for npm listing
- [ ] **Homepage field** — Add for npm sidebar link

## ✅ Already Done

- [x] tsconfig.build.json created (excludes tests from build)
- [x] .npmignore configured
- [x] Shell completions (bash, zsh, fish)
- [x] Playlist persistence (save/load)
- [x] History command
- [x] Error handling with structured error types
- [x] Multi-provider AI support (OpenAI, Anthropic, Gemini)
- [x] 227+ tests passing
- [x] Launch content drafted (HN, Reddit, Twitter, blog, demo script)
- [x] README polished with CI badge and contributing guidelines
- [x] Package validation tests

## Verification Commands

```bash
# Build
npm run build

# Test
npm test

# Verify tarball contents
npm pack --dry-run

# Check for vulnerabilities
npm audit

# Smoke test CLI
node dist/cli.js --version
node dist/cli.js --help
node dist/cli.js config show --json
```
