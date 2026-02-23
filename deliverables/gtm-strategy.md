# GTM Strategy — mixaroo-lite

**Product:** AI-powered CLI playlist generator with YouTube playback links
**Version:** 1.0.0 | **CLI command:** `mx-lite`
**Date:** 2026-02-23

---

## 1. Product Summary

mixaroo-lite is a Node.js CLI tool that uses AI (OpenAI, Anthropic, Google Gemini) to generate music playlists from natural language prompts and creates YouTube playback links. Key commands: `setup`, `generate`, `list`, `play`, `history`, `config`, `completions`.

**Core value prop:** "Describe a vibe, get a YouTube playlist in seconds — from your terminal."

## 2. Target Market

### Primary: Developer/Power-User Music Lovers
- Developers who live in the terminal
- CLI enthusiasts (homebrew/npm ecosystem users)
- Music discovery hobbyists who want AI-curated playlists

### Secondary: AI Tool Enthusiasts
- People exploring AI-powered CLI tools
- Content creators looking for quick playlist generation
- Productivity-focused users who want music without leaving workflow

### Market Size
- npm has ~17M weekly active users
- CLI tool category growing 20%+ YoY
- AI-powered tools are peak-attention in 2026

## 3. Competitive Landscape

| Competitor | Differentiator |
|---|---|
| Spotify AI DJ | Locked to Spotify, no CLI, no prompt control |
| ChatGPT playlists | No YouTube links, no save/replay, no CLI |
| Maroofy | Web-only, song-similarity not prompt-based |
| playlistify | Web app, no terminal workflow |

**mixaroo-lite's moat:** Only CLI-native, multi-provider AI playlist tool with direct YouTube links, local persistence, and shell completions.

## 4. Launch Channels (Priority Order)

### Tier 1 — High Impact
1. **Hacker News** — "Show HN: I built an AI playlist generator for the terminal"
   - Target: front page via developer-appeal angle
   - Existing draft: `docs/hackernews-launch.md`
2. **Reddit r/commandline + r/node** — CLI tool showcase
   - Existing draft: `docs/reddit-posts.md`
3. **npm publish** — Primary distribution, `npm install -g mixaroo-lite`

### Tier 2 — Sustained Growth
4. **Twitter/X launch thread** — Existing draft: `docs/twitter-launch-thread.md`
5. **Dev.to / Hashnode blog** — "How I Built" story (draft: `docs/blog-how-i-built.md`)
6. **GitHub README + demo GIF** — Discovery via GitHub trending

### Tier 3 — Long Tail
7. **YouTube demo video** — Recording guide exists: `docs/recording-guide.md`
8. **Product Hunt** — Week 2 launch for sustained momentum
9. **Newsletter mentions** — CLI/AI tool roundups

## 5. Launch Sequence

### Week 0 (Pre-launch)
- [ ] Fix remaining test failures (11 JSON output tests)
- [ ] Fix npm tarball (test file leak identified by QA)
- [ ] Fix documentation accuracy issues (7 items from QA audit)
- [ ] Record demo GIF for README
- [ ] Verify all AI providers work end-to-end

### Week 1 (Launch)
- Day 1: npm publish + GitHub release
- Day 1: Hacker News "Show HN" post
- Day 1: Twitter launch thread
- Day 2: Reddit posts (r/commandline, r/node, r/javascript)
- Day 3: Dev.to blog post
- Day 5: Respond to feedback, ship hotfixes

### Week 2 (Amplify)
- Product Hunt launch
- GitHub stars campaign (add to awesome-cli lists)
- Iterate on feedback from Week 1

### Week 3+ (Sustain)
- Weekly npm download tracking
- Community feature requests → roadmap
- SEO content (tutorials, comparisons)

## 6. Success Metrics

| Metric | Week 1 Target | Month 1 Target |
|---|---|---|
| npm weekly downloads | 200 | 1,000 |
| GitHub stars | 100 | 500 |
| HN upvotes | 50+ | — |
| Issues/PRs from community | 5 | 20 |

## 7. Growth Levers

1. **Shell completions** — Reduces friction, increases daily use
2. **Multi-provider AI** — Broader audience (not locked to OpenAI)
3. **Playlist persistence** — Replay value = retention
4. **History command** — Usage tracking encourages exploration
5. **`--json` output** — Enables piping/scripting = power-user love

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| YouTube API rate limits / breakage | yt-search is scraping-based; monitor, add fallback |
| AI provider API costs for users | Clear docs on free tiers; Gemini has generous free |
| Low discoverability | SEO blog + multiple launch channels |
| npm security audit (18 vulns) | Audit and fix before publish |
