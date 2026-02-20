# Market Research: mixaroo-lite

## Product Summary

mixaroo-lite is a CLI tool that turns natural language prompts into YouTube playlists. Users describe a vibe ("90s rock road trip anthems"), AI generates a curated song list, YouTube IDs are resolved, and a clickable playlist URL is returned. Supports OpenAI, Gemini, and Anthropic as AI backends. Currently macOS only.

**Current State:** Code complete (v1.0.0), npm-publishable, launch docs drafted (HN post, Twitter thread, demo script). No public launch has occurred yet.

## Target Market

### Primary Audience
- **Developer-music-lovers** — Engineers/tech workers aged 22-40 who live in the terminal, use CLI tools daily, and listen to music while working. They appreciate elegant developer tools and share them on HN/Twitter/Reddit.
- Estimated global developer population: ~28M. CLI-tool-enthusiastic subset: ~5-8M. Music-interested subset: ~3-5M.

### Secondary Audience
- **Power users & tinkerers** — Non-developers who are comfortable with `npm install -g` and enjoy automation. Podcasters, DJs doing quick research, content creators looking for background music playlists.

### Market Sizing
- **TAM:** ~$2B (AI-assisted music discovery + playlist tools market)
- **SAM:** ~$50M (CLI/developer-tool segment of music discovery)
- **SOM (Year 1):** 5,000-15,000 npm installs, 500-2,000 weekly active users. Revenue potential if monetized: $0 (freemium open-source) to $50K (with premium tier).

## Competitive Landscape

| Competitor | Type | Strengths | Weaknesses | Price | Differentiation vs mixaroo-lite |
|-----------|------|-----------|------------|-------|-------------------------------|
| **Spotify AI Playlist** (AI DJ, daylist) | Platform feature | Massive library, personal taste data, seamless playback | Locked to Spotify, no CLI, no custom prompts | $0-11/mo | mixaroo-lite is platform-agnostic, CLI-native, open-source |
| **PlaylistAI** (app) | Mobile/web app | Polished UI, multi-platform export (Spotify/Apple) | Not CLI, requires account, $5/mo for unlimited | $0-5/mo | mixaroo-lite is instant, no account, free, terminal-native |
| **Receiptify / Chosic** | Web tools | Visual, shareable | Focused on existing listening data, not prompt-based | Free | mixaroo-lite generates FROM prompts, not existing data |
| **spotify-tui / ncspot** | CLI Spotify clients | Full Spotify in terminal | Require Spotify Premium, no AI generation | Free (need Premium) | mixaroo-lite doesn't need any subscription |
| **ChatGPT / Claude (manual)** | General AI | Can generate song lists on demand | No YouTube integration, manual copy-paste | $0-20/mo | mixaroo-lite automates the entire prompt→playback pipeline |

## User Personas

### Persona 1: "Terminal Taylor" (Primary)
- **Profile:** 28-year-old backend engineer at a startup. Uses tmux, neovim, and has 40+ CLI tools installed.
- **Pain point:** Wants background music while coding. Hates switching to a browser, opening Spotify, searching for playlists that never quite match the vibe.
- **Current solution:** Asks ChatGPT for song lists, manually searches YouTube. Takes 10+ minutes.
- **mixaroo-lite value:** One command, 30 seconds, done.

### Persona 2: "Hacker News Hannah" (Amplifier)
- **Profile:** 35-year-old tech lead. Reads HN daily, upvotes cool Show HN projects, shares on Twitter.
- **Pain point:** Loves discovering clever developer tools. Will try anything with a good README and a clean demo GIF.
- **mixaroo-lite value:** "This is cool, I'll star it and share it."

### Persona 3: "Content Creator Chris" (Secondary)
- **Profile:** 30-year-old YouTuber who needs royalty-free background music playlists for videos.
- **Pain point:** Spending hours curating background playlists.
- **mixaroo-lite value:** Quick playlist ideation (though YouTube links may have copyright issues for their use case).

## Market Gaps and Opportunities

1. **No CLI-native AI playlist tool exists.** This is a blue ocean in the developer tooling space. Zero direct competitors.
2. **YouTube as the playback layer is genius for v1** — no API keys from music services, no OAuth, no premium subscriptions needed. Friction-free.
3. **The "Show HN" moment** — this product is perfectly designed for a viral developer launch. Clean README, simple concept, immediate value.
4. **Expansion potential:** Spotify export, Apple Music export, saved playlists, collaborative playlists, web UI version.

## Key Risks

1. **YouTube `watch_videos` URL instability** — This undocumented YouTube endpoint could break at any time. YouTube doesn't officially support it. High risk.
2. **yt-search dependency** — Scraping YouTube search results is fragile and may break or get rate-limited.
3. **One-trick pony risk** — After the novelty wears off, retention depends on users actually preferring CLI over Spotify/YouTube directly.
4. **macOS only** — Limits initial audience by ~60-70% (most developers use Linux or WSL).
5. **No persistence** — Playlists aren't saved. Users can't revisit past generations.

## My Recommendations

1. **Launch NOW.** The product is ready. Launch docs are drafted. The competitive window for "first CLI AI playlist tool" is open. Every week of delay risks someone else shipping the same idea.

2. **Fix the Linux limitation before launch.** The README says "macOS only" but I see nothing in the code that's actually macOS-specific (no `open` command, no macOS APIs). This might be an outdated claim. Verify and remove it — this could double the launch audience.

3. **Add playlist saving** as a fast follow (save to `~/.mixaroo-lite/history/`). This addresses retention.

4. **Target HN first, then Twitter/Reddit.** The launch docs are well-prepared. HN Show HN is the highest-leverage channel for this product category.

5. **Consider a Homebrew tap AND npm install path** — both are in the README already, which is good. The Homebrew tap needs to actually exist at `schoolofai/tap`.

Note: This analysis is based on my training knowledge. I recommend the CEO verify competitive data and pricing with current market research.
