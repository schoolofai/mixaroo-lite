# Go-to-Market Strategy: mixaroo-lite

## Product Summary

mixaroo-lite is an AI-powered CLI tool that turns natural language prompts into YouTube playlists. Users describe a mood or theme, the AI generates a tracklist, YouTube search finds each track, and users get a single playback URL. Supports OpenAI, Google Gemini, and Anthropic Claude.

**Stack**: TypeScript, Node.js 18+, Commander.js, conf (XDG config), yt-search  
**Distribution**: npm (`npm install -g mixaroo-lite`), Homebrew tap  
**Status**: v1.0.0, 1,712 LOC, 238 passing tests, launch docs drafted

---

## Value Proposition

**For** developers and terminal-native power users who live in the CLI,  
**mixaroo-lite** is the playlist generator that lets you  
**go from mood description to music in one command**,  
unlike Spotify/YouTube's browse-and-queue workflow which  
**requires context-switching, account management, and manual curation**.

---

## Target Market

### Primary Audience
- **Developer / CLI enthusiast** (ages 20–40)
- Lives in terminal, uses tools like fzf, ripgrep, tmux
- Listens to music while coding; frustrated by playlist curation friction
- Active on Hacker News, Reddit r/commandline, Dev.to, Twitter dev community
- Willingness to pay: $0 (open-source), but high word-of-mouth potential

### Secondary Audience
- **Music hobbyists** curious about AI-generated recommendations
- YouTube-first listeners who want quick, themed playlists
- Educators/content creators who need curated background music

### Market Sizing
- **TAM**: ~30M developers worldwide who listen to music while working
- **SAM**: ~5M CLI-active developers on macOS/Linux who install npm packages
- **SOM**: 5,000–15,000 installs in first 90 days (realistic for Show HN + Reddit + Twitter launch)

---

## Competitive Landscape

| Competitor | Strengths | Weaknesses | Pricing | Our Differentiation |
|-----------|-----------|------------|---------|---------------------|
| Spotify Discover | Huge catalog, ML-powered | Requires account, GUI-only, no CLI | Freemium ($10/mo) | CLI-native, no account needed |
| YouTube Music | Integrated with YouTube | No natural-language prompt, GUI-only | Freemium ($10/mo) | AI prompt → instant playlist |
| spotify-tui | CLI-based, real Spotify | Requires Spotify Premium, complex auth | $10/mo Spotify | Zero-account, one-command setup |
| playlisty.ai | AI-generated playlists | Web-only, requires Spotify connection | Free | Terminal-native, YouTube-based |
| ChatGPT + manual search | Flexible AI prompts | Manual copy-paste, no playback link | $20/mo | Automated end-to-end pipeline |

### Key Insight
No existing tool combines AI prompt understanding with CLI delivery and YouTube playback. mixaroo-lite owns the intersection of "AI playlist" + "terminal workflow" + "zero-account YouTube".

---

## Positioning

- **Category**: Developer CLI tools / AI-powered music utilities
- **Differentiator**: Only tool that does prompt → playlist → YouTube playback entirely from the terminal
- **Price Position**: Free and open-source (growth > revenue for now)
- **Tagline**: "Turn any prompt into a YouTube playlist. From your terminal."

---

## Growth Model (AARRR)

### Acquisition (How users discover us)
1. **Hacker News Show HN** — Primary launch channel. Dev-tool CLI projects perform well. Draft ready at docs/hackernews-launch.md.
2. **Reddit** — r/commandline, r/programming, r/node, r/coolgithubprojects. Drafts at docs/reddit-posts.md.
3. **Twitter/X Dev Community** — Launch thread with demo GIF. Draft at docs/twitter-launch-thread.md.
4. **npm discovery** — Keywords (playlist, music, youtube, ai, cli) drive organic npm searches.
5. **GitHub SEO** — Topics, description, README badges, demo GIF.

### Activation (First-use "aha moment")
- `npm install -g mixaroo-lite && mx-lite setup && mx-lite "chill lo-fi beats"`
- Time to "aha": < 2 minutes (setup + first generation)
- Demo GIF in README shows the full flow (needs recording — see docs/recording-guide.md)

### Retention (Why users come back)
- `--save` flag lets users build a library of playlists
- `mx-lite list` / `mx-lite play` for replaying favorites
- `mx-lite history` for recent generations
- Shell completions (`mx-lite completions`) reduce friction

### Revenue (Future monetization)
- Phase 1 (now): Free, build user base
- Phase 2 (post-1K stars): Sponsorships, GitHub Sponsors
- Phase 3 (post-5K stars): Premium features (Spotify export, playlist sharing, web UI)

### Referral (Word-of-mouth mechanics)
- The YouTube playlist URL itself is shareable — every playlist shared promotes the tool
- GitHub star count as social proof
- "Built with mixaroo-lite" potential in shared playlists

---

## KPIs and Success Metrics

| Metric | 30-day Target | 90-day Target | Measurement Method |
|--------|--------------|---------------|-------------------|
| GitHub Stars | 200 | 1,000 | GitHub API |
| npm Weekly Downloads | 500 | 2,000 | npm stats |
| Hacker News Points | 50+ | — | HN post |
| Reddit Upvotes (combined) | 100+ | — | Reddit posts |
| Test Coverage | 90%+ | 95%+ | vitest coverage |
| Open Issues Resolved | 80% within 7d | 80% within 7d | GitHub Issues |

---

## Go-to-Market Timeline

| Week | Phase | Activities | Deliverables |
|------|-------|-----------|-------------|
| 1 | Polish | Record demo GIF, fix doc issues, tsconfig.build.json cleanup, verify npm publish | Demo GIF, clean tarball, accurate docs |
| 2 | Pre-launch | Finalize HN post, Reddit posts, Twitter thread. Set up GitHub Actions CI badge. | Launch content ready |
| 3 | Launch | Post to HN, Reddit, Twitter. Monitor and respond to comments. | Live posts, engagement |
| 4 | Sustain | Address issues from launch feedback. Blog post on Dev.to. | Bug fixes, blog |
| 5-6 | Feature | Spotify export, playlist sharing URL, multi-platform improvements | New features shipped |
| 7-8 | Growth | Second wave: Product Hunt, Dev.to, newsletter mentions | Broader reach |
| 9-12 | Iterate | Analyze metrics, prioritize feature requests, consider v2 roadmap | Data-driven roadmap |

---

## Recommended Tech Stack (Current — No Changes Needed)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | TypeScript | Type safety, developer audience alignment |
| CLI Framework | Commander.js | Industry standard, excellent DX |
| AI Providers | OpenAI + Gemini + Anthropic | User choice, cheapest models |
| YouTube Search | yt-search | No API key required, good accuracy |
| Config | conf (XDG) | Platform-native config paths |
| Testing | vitest | Fast, TypeScript-native, 238 tests |
| CI | GitHub Actions | Standard for OSS |
| Distribution | npm + Homebrew | Covers macOS + Linux + Windows |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| YouTube watch_videos URL breaks | Medium | High | Monitor, add fallback (individual links) |
| AI hallucinated songs | Low | Medium | Already handled (skip non-found tracks) |
| API key cost concerns | Low | Low | Uses cheapest models, ~$0.001/playlist |
| yt-search rate limiting | Medium | Medium | Add caching, retry logic |
| Competition from Spotify CLI tools | Low | Low | Different value prop (no account needed) |
