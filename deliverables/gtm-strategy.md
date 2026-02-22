# GTM Strategy — mixaroo-lite

_Generated: 2026-02-22 | Cycle: adopt:mixaroo-lite:2026-02-22T19:10:38.077Z:2d4acd7f_

## Product Summary

**mixaroo-lite** is a TypeScript CLI tool that turns natural language prompts into YouTube playlists using AI (OpenAI, Gemini, Anthropic). Users describe a vibe, get a playable YouTube link.

**Core value prop:** "Turn any prompt into a YouTube playlist. From your terminal."

## Market Positioning

### Category
Developer tools / Music discovery CLI

### Target Segments
1. **Primary:** Developer/hacker community (terminal-native, CLI-comfortable)
2. **Secondary:** Music enthusiasts who want AI-curated playlists without Spotify lock-in
3. **Tertiary:** Content creators needing quick background music playlists

### Competitive Landscape
- Spotify AI DJ — closed ecosystem, requires subscription
- YouTube Music — no CLI, no AI prompt interface
- Maroofy / Songrequest — web-based, different UX paradigm
- **mixaroo-lite differentiator:** Open-source, terminal-native, multi-provider AI, zero-signup YouTube playback

## Distribution Channels (Priority Order)

| Channel | Effort | Expected Impact | Timeline |
|---------|--------|-----------------|----------|
| npm registry | ✅ Done | Foundation | Now |
| Homebrew tap | ✅ Done | macOS developers | Now |
| Hacker News launch | Medium | High (viral potential) | Week 1 |
| Reddit (r/commandline, r/node, r/music) | Low | Medium | Week 1 |
| Twitter/X dev community | Low | Medium | Week 1-2 |
| Dev.to / blog post | Medium | Long-tail SEO | Week 2 |
| YouTube demo video | Medium | Conversion driver | Week 2 |
| Product Hunt | Medium | Spike + credibility | Week 3 |

## Growth Strategy

### Phase 1: Launch & Awareness (Weeks 1-3)
- Hacker News "Show HN" post with demo GIF
- Reddit posts in r/commandline, r/node, r/opensource
- Twitter launch thread with terminal recording
- Blog post: "How I Built an AI Playlist Generator in a Weekend"

### Phase 2: Engagement & Retention (Weeks 4-8)
- Add `--save` flag to persist playlists locally
- Add `--share` to generate shareable short links
- Playlist history and favorites
- Shell completions (bash, zsh, fish)

### Phase 3: Growth Loops (Weeks 8-16)
- `mx-lite trending` — community-submitted prompts
- Plugin system for additional music sources (Spotify, SoundCloud)
- Web companion (paste a link, see the playlist)
- GitHub Stars campaign / Awesome List submissions

## Key Metrics

| Metric | Baseline | Week 4 Target | Week 12 Target |
|--------|----------|---------------|----------------|
| npm weekly downloads | TBD | 200 | 1,000 |
| GitHub stars | TBD | 100 | 500 |
| Homebrew installs | TBD | 50 | 200 |
| CLI daily active usage | 0 | 30 | 150 |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| YouTube rate-limits yt-search | Medium | High | Add caching, fallback search |
| AI provider cost concerns | Low | Medium | Already uses cheapest models |
| YouTube blocks watch_videos URL format | Medium | High | Alternative: generate individual links or m3u |
| Low retention (one-trick pony) | Medium | Medium | Phase 2 features (save, share, history) |

## Launch Readiness Requirements

1. ✅ npm package published
2. ✅ Homebrew tap configured
3. ✅ CI/CD pipeline (GitHub Actions)
4. ✅ 124 passing tests
5. 🔲 Demo GIF/recording for README
6. 🔲 Launch content (HN post, blog, tweets) — drafted in /docs
7. 🔲 npm download baseline metrics captured
8. 🔲 GitHub repo public and polished
