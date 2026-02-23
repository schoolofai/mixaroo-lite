# GTM Strategy — mixaroo-lite

**Product:** AI-powered CLI that turns natural language prompts into YouTube playlists
**Version:** 1.0.0 | **License:** MIT | **Stack:** TypeScript, Node.js ≥18
**Generated:** 2026-02-23

---

## 1. Product Summary

mixaroo-lite (`mx-lite`) is a CLI tool that takes a text prompt (e.g. "90s rock road trip anthems"), calls an AI provider (OpenAI, Gemini, or Anthropic) to generate a song list, searches YouTube for each track, and produces a single playback URL. It also supports playlist saving, history, shell completions, and multi-provider configuration.

## 2. Target Audience

| Segment | Size | Fit |
|---------|------|-----|
| Developer music lovers | Large | ★★★★★ — CLI-native, loves automation |
| Terminal power users | Medium | ★★★★ — appreciates elegant CLI tools |
| AI/LLM enthusiasts | Large | ★★★★ — novel AI use case, shareable |
| Playlist curators | Medium | ★★★ — if comfortable with terminal |

**Primary ICP:** Software developers who listen to music while coding and enjoy discovering new playlists through creative prompts.

## 3. Competitive Landscape

- **Spotify AI DJ / Playlist generators** — GUI, walled garden, requires subscription
- **ChatGPT + manual search** — no automation, high friction
- **Maroofy / Receiptify** — web-based, different UX paradigm

**Differentiator:** Zero-friction, terminal-native, provider-agnostic AI playlist generation with instant YouTube playback. No account needed beyond an AI API key.

## 4. Launch Channels (Priority Order)

### Tier 1 — High Impact
1. **Hacker News** — "Show HN" post. CLI tools with AI angles perform well. Target front page.
2. **Reddit** — r/commandline, r/node, r/programming, r/artificial
3. **Twitter/X** — Launch thread with terminal recording GIF. Tag AI/dev influencers.

### Tier 2 — Sustained Growth
4. **Dev.to / Hashnode** — "How I Built" blog post
5. **Product Hunt** — CLI category launch
6. **YouTube** — Demo video showing prompt → playlist → playback

### Tier 3 — Long Tail
7. **npm trending** — Optimize package metadata for discovery
8. **GitHub trending** — Star campaign via social posts
9. **Newsletter mentions** — TLDR, Console.dev, JavaScript Weekly

## 5. Launch Sequence

| Week | Action | Owner |
|------|--------|-------|
| W1 | Polish README, record demo GIF, finalize docs | Content + Dev |
| W1 | Ensure npm publish works, CI green, 200+ tests | Dev + QA |
| W2 | Publish to npm, submit Show HN, post Reddit threads | Lead + Content |
| W2 | Twitter launch thread, Dev.to blog post | Content |
| W3 | Product Hunt launch, respond to community feedback | Lead + Content |
| W3 | Triage GitHub issues, ship quick fixes | Dev + QA |
| W4 | Measure metrics, plan v1.1 based on feedback | Lead |

## 6. Success Metrics

| Metric | W1 Target | W4 Target | Tool |
|--------|-----------|-----------|------|
| npm weekly downloads | 50 | 500 | npm stats |
| GitHub stars | 25 | 200 | GitHub |
| HN points | 50+ | — | HN |
| GitHub issues (engagement) | 5 | 20 | GitHub |
| Test coverage | 200+ tests | 250+ tests | vitest |

## 7. Pre-Launch Blockers

- [ ] Demo GIF/recording for README
- [ ] npm publish dry-run verified
- [ ] All tests passing (currently 214+)
- [ ] Launch docs reviewed (HN post, Reddit posts, Twitter thread, blog)

## 8. Post-Launch Growth Levers

1. **Spotify integration** — most-requested feature, massive TAM expansion
2. **Web UI wrapper** — lower barrier to entry for non-CLI users
3. **Playlist sharing** — social virality (share links, embed playlists)
4. **Plugin system** — community-contributed AI providers or music services
5. **Collaborative playlists** — multi-user prompt mixing

## 9. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| YouTube URL format breaks | High | Monitor, version-pin yt-search |
| AI provider API costs scare users | Medium | Default to cheapest model, document costs |
| Low CLI adoption ceiling | Medium | Plan web UI as growth lever |
| npm package name confusion | Low | Strong README, unique branding |
