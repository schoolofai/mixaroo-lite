# Go-to-Market Strategy: mixaroo-lite

## Product Summary

mixaroo-lite is a TypeScript CLI tool that turns natural language prompts into YouTube playlists. Users describe a vibe, AI generates a song list, YouTube search finds videos, and a clickable playlist URL is returned. Supports OpenAI, Gemini, and Anthropic as AI providers.

**Current state:** v1.0.0 — functional, published on npm, has Homebrew tap. Launch docs (HN post, Twitter thread, demo script) already drafted but not yet executed.

## Value Proposition

For **developers and terminal power-users who love music**, mixaroo-lite is the **CLI playlist generator** that **eliminates the search-add-repeat loop** — unlike manually searching YouTube or using Spotify's algorithmic playlists, mixaroo-lite lets you describe any vibe and get an instant, playable playlist in seconds.

## Positioning

- **Category:** Developer tool / Music utility
- **Differentiator:** Terminal-native, prompt-driven, zero-friction (no OAuth, no accounts)
- **Price positioning:** Free & open-source (users bring their own AI API key)
- **Competitive moat:** Simplicity. No web app, no login, no subscription. Just a command.

## Competitive Landscape

| Competitor | Type | Strengths | Weaknesses | Differentiation |
|-----------|------|-----------|------------|-----------------|
| Spotify Discover | Platform | Massive catalog, personalized | Locked in Spotify, algorithm-driven not prompt-driven | No natural language prompt interface |
| ChatGPT + manual search | Workflow | Flexible | High friction — copy-paste each song | mixaroo-lite automates the entire pipeline |
| Maroofy | Web app | Song similarity | Single-song input, web-only | No CLI, no prompt-based generation |
| playlistify.me | Web app | Spotify integration | Requires Spotify auth, web-only | No terminal workflow |

## Growth Model (AARRR)

### Acquisition
- **Primary:** Hacker News Show HN (launch docs already drafted)
- **Secondary:** Twitter/X developer community thread
- **Tertiary:** Dev blogs, Reddit r/commandline, r/musicproduction
- **Organic:** npm discovery, GitHub trending

### Activation
- Install → `mx-lite setup` → first playlist in < 2 minutes
- "Aha moment": seeing 25 songs appear and clicking the YouTube link

### Retention
- Daily use for music discovery / work playlists
- Feature expansion (Spotify export, playlist saving, history)

### Revenue
- **Phase 1:** Free & open-source (grow user base)
- **Phase 2 option:** Premium "mixaroo" with Spotify/Apple Music integration, playlist saving, web UI — freemium model
- **Phase 3 option:** API-as-a-service for other apps wanting playlist generation

### Referral
- Terminal screenshots/GIFs are inherently shareable
- `--share` flag could generate a shareable playlist page
- GitHub stars as social proof

## KPIs and Success Metrics

| Metric | 30-day target | 90-day target | Measurement Method |
|--------|--------------|---------------|-------------------|
| GitHub stars | 200 | 1,000 | GitHub API |
| npm weekly downloads | 100 | 500 | npm stats |
| HN upvotes | 50+ | — | Post tracking |
| Twitter impressions | 10K | — | Twitter analytics |
| Active GitHub issues/PRs | 5+ | 15+ | GitHub |

## Go-to-Market Timeline

| Week | Phase | Activities | Deliverables |
|------|-------|-----------|-------------|
| 1 | Pre-launch prep | Record demo GIF, finalize README, cross-platform testing | Demo assets, polished README |
| 2 | Launch | HN Show HN post, Twitter thread, engage comments | Launch posts, community responses |
| 3 | Momentum | Reddit posts, dev blog/tutorial, collect feedback | Blog post, feature request triage |
| 4 | Iterate | Ship top-requested feature (likely Spotify or Linux support) | v1.1.0 release |
| 5-6 | Content | "How I built" blog post, YouTube demo video | Content pieces |
| 7-8 | Growth | Second launch wave (Product Hunt?), newsletter mentions | PH listing |
| 9-12 | Expand | Spotify integration, playlist saving, web companion | v2.0.0 planning |

## Recommended Tech Stack Additions

- **Analytics:** Simple download tracking via npm stats + GitHub traffic (no added infra)
- **CI/CD:** GitHub Actions for build/test/publish (already has npm scripts)
- **Testing:** Vitest for unit tests (fast, TypeScript-native)
- **Cross-platform:** Fix macOS-only limitation → Linux/Windows support needed before launch

## Key Risks

1. **YouTube `watch_videos` URL may break** — it's an unofficial endpoint. Mitigation: Spotify integration as backup.
2. **AI hallucination** — generates songs that don't exist. Mitigation: already handled (marked as "not found").
3. **yt-search reliability** — scraping-based, may break. Mitigation: fallback to YouTube Data API.
4. **Small TAM** — CLI-only limits audience. Mitigation: web companion in Phase 2.

## My Recommendations

1. **Launch NOW** — the product works, launch docs are drafted. Don't over-polish.
2. **Add Linux support before launch** — "macOS only" cuts the HN audience in half.
3. **Add basic tests** — zero test coverage is a risk for contributions and credibility.
4. **Ship Spotify export in v1.1** — it's the #1 feature people will ask for.
5. **Record the demo GIF** — the launch docs reference it but it doesn't exist yet.
