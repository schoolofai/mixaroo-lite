# Pre-Flight Checklist — mixaroo-lite v1.0.0

**Date:** 2026-02-23 | **Status:** IN PROGRESS

---

## 🔴 Blockers (Must Fix Before Publish)

- [ ] **npm tarball leaks test files** — 44 test files compiled into dist/ via tsc. Fix: tsconfig.build.json excludes `__tests__` dirs (TASK-033 addressed this — verify)
- [ ] **11 test failures** — `json-output.test.ts` and `cli.test.ts` fail (need `npm run build` before integration tests)
- [ ] **npm audit: 18 vulnerabilities** (5 moderate, 13 high) — Run `npm audit fix`, evaluate breaking changes
- [x] **Documentation accuracy** — 7 issues found by QA (TASK-031): fixed default length (30→25), fixed config paths, verified no `config get` reference remains

## 🟡 Should Fix Before Launch

- [ ] **Demo GIF** — README has placeholder, need actual recording (guide: `docs/recording-guide.md`)
- [x] **CHANGELOG date** — Fixed to 2026-02-19 (matches initial commit)
- [x] **Blog post accuracy** — Blog already says ~1,700; fixed Twitter (~500→~1,700); fixed HN save/load roadmap
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
