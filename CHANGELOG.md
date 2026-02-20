# Changelog

All notable changes to mixaroo-lite will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-02-20

### Added

- **Core playlist generation** — describe a vibe, get 25 songs matched to YouTube
- **Multi-provider AI support** — OpenAI (gpt-4o-mini), Google Gemini (gemini-1.5-flash), Anthropic (claude-3-haiku)
- **YouTube search** — automatic track matching via yt-search, no API key required
- **Interactive setup** — `mx-lite setup` wizard for provider selection and API key configuration
- **Config management** — `mx-lite config` to view/update provider, API key, and song count
- **Playable URL output** — single YouTube `watch_videos` link for the full playlist
- **XDG-compliant config** — stored in `~/.config/mixaroo-lite/`
- **Homebrew formula** — `brew tap schoolofai/tap && brew install mixaroo-lite`

### Known Issues

- macOS only (Linux and Windows support planned)
- YouTube search may miss obscure or very new tracks
- AI occasionally generates songs that don't exist (gracefully skipped)
- YouTube playlist URL uses `watch_videos` workaround, not native playlist creation

[1.0.0]: https://github.com/schoolofai/mixaroo-lite/releases/tag/v1.0.0
