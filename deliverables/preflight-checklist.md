# Pre-Flight Checklist: mixaroo-lite

## Status Legend
- **BLOCKING** — Team cannot start this workstream without it
- **NEEDED BEFORE LAUNCH** — Can start but must have before go-live
- **NICE-TO-HAVE** — Can work around if not available

---

## Code & Build

| Item | Status | Notes |
|------|--------|-------|
| GitHub repo access | ✅ Available | https://github.com/schoolofai/mixaroo-lite |
| npm registry access (publish) | **BLOCKING** | Need npm token with publish rights to `mixaroo-lite` package |
| Node.js 18+ runtime | ✅ Available | v22 in containers |
| TypeScript build (tsconfig.build.json) | ✅ Available | Excludes tests from dist/ |
| Test suite passing | ✅ 238/238 | vitest, all green |
| CI pipeline (GitHub Actions) | ✅ Available | .github/workflows/ci.yml exists |

## Distribution

| Item | Status | Notes |
|------|--------|-------|
| npm publish token | **BLOCKING** | Required to publish v1.0.0 to npm |
| Homebrew tap repo | **NEEDED BEFORE LAUNCH** | schoolofai/homebrew-tap — need access or creation |
| Package tarball clean | ✅ Fixed | .npmignore + tsconfig.build.json exclude test files |

## AI Provider Keys (for testing)

| Item | Status | Notes |
|------|--------|-------|
| OpenAI API key | **NICE-TO-HAVE** | For integration testing; unit tests mock providers |
| Google Gemini API key | **NICE-TO-HAVE** | Same |
| Anthropic API key | **NICE-TO-HAVE** | Same |

## Launch Content

| Item | Status | Notes |
|------|--------|-------|
| Demo GIF/recording | **NEEDED BEFORE LAUNCH** | docs/recording-guide.md + assets/demo.tape exist but GIF not recorded |
| Hacker News post draft | ✅ Ready | docs/hackernews-launch.md |
| Reddit posts drafts | ✅ Ready | docs/reddit-posts.md |
| Twitter thread draft | ✅ Ready | docs/twitter-launch-thread.md |
| Blog post draft | ✅ Ready | docs/blog-how-i-built.md |
| README polish | ✅ Done | Badges, install instructions, feature list |

## Documentation Accuracy

| Item | Status | Notes |
|------|--------|-------|
| Config path references | ⚠️ Needs fix | Some docs reference wrong config path |
| Default length documentation | ⚠️ Needs fix | Some docs say 25, actual default is 25 (conf schema) |
| Demo script accuracy | ⚠️ Needs fix | docs/demo-script.md has stale config path |

## Analytics & Monitoring

| Item | Status | Notes |
|------|--------|-------|
| npm download tracking | **NICE-TO-HAVE** | npm stats are public, no setup needed |
| GitHub star tracking | **NICE-TO-HAVE** | Consider star-history.com embed |
| Error reporting | **NICE-TO-HAVE** | Consider optional telemetry in future |

---

## Summary for CEO

**BLOCKING (must provide before team can ship)**:
1. npm publish token — without this we cannot release to npm

**NEEDED BEFORE LAUNCH (can start work, must have before go-live)**:
1. Demo GIF recording — README needs a visual demo
2. Homebrew tap repository access — for macOS distribution

**NICE-TO-HAVE (team can work around)**:
1. AI provider API keys for integration testing
2. Analytics/monitoring setup
3. Star tracking embeds

**Recommendation**: Provide the npm publish token when ready. The team can do all code polish, doc fixes, and content work in parallel. We'll flag when we hit the publish blocker.
