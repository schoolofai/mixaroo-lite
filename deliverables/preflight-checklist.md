# Pre-Flight Checklist: mixaroo-lite

## BLOCKING — Team cannot start without these

- [x] **GitHub repository access** — repo exists at github.com/schoolofai/mixaroo-lite, cloned locally
- [x] **Source code** — v1.0.0 TypeScript codebase is complete and functional
- [x] **npm publishing access** — package already published as `mixaroo-lite`

## NEEDED BEFORE LAUNCH — Can start work but must resolve before go-live

- [ ] **Cross-platform testing** — Currently macOS-only. Linux support needed before HN launch (audience is ~50% Linux). CEO: confirm if Linux/Windows support is a launch blocker or post-launch.
- [ ] **Demo GIF/recording** — Launch docs reference a demo.gif that doesn't exist yet. Need: screen recording tool + working AI API key for demo.
- [ ] **AI API key for testing** — QA needs at least one provider key (OpenAI/Gemini/Anthropic) to test end-to-end. CEO: provide a test API key or confirm we test with mocked responses only.
- [ ] **Homebrew tap verification** — README references `brew tap schoolofai/tap`. CEO: confirm this tap exists and is published.

## NICE-TO-HAVE — Can work around if not available

- [ ] **Twitter/X account access** — For launch thread. CEO can post manually from drafted content.
- [ ] **Hacker News account** — For Show HN post. CEO can post manually.
- [ ] **Google Analytics / Plausible** — For tracking post-launch traffic to GitHub. Can use GitHub's built-in traffic stats instead.
- [ ] **Custom domain** — Not needed for CLI tool. GitHub repo URL is sufficient.
- [ ] **Stripe/payment keys** — Not needed until revenue phase.

## Summary

The product is already built and published. The main gaps are:
1. **Testing infrastructure** (zero tests currently)
2. **Cross-platform support** (macOS-only)
3. **Demo assets** (GIF not yet recorded)
4. **Test API key** (for QA end-to-end testing)

These are all addressable by the team without blocking on external credentials. The biggest CEO decision: **should we fix Linux support before launch or launch macOS-only?**
