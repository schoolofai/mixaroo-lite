# 🎵 mixaroo-lite

**Turn any prompt into a YouTube playlist. From your terminal.**

[![npm version](https://img.shields.io/npm/v/mixaroo-lite.svg)](https://www.npmjs.com/package/mixaroo-lite)
[![CI](https://img.shields.io/github/actions/workflow/status/schoolofai/mixaroo-lite/ci.yml?branch=main&label=CI)](https://github.com/schoolofai/mixaroo-lite/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/mixaroo-lite.svg)](https://nodejs.org/)

<!-- TODO: Replace with demo.gif once recorded (see assets/demo.tape + docs/recording-guide.md) -->

---

```
$ mx-lite "upbeat 80s synthwave for coding" -l 10

🎵 Generating 10 songs for: "upbeat 80s synthwave for coding"
   Using OpenAI (gpt-4o-mini)

✓ Generated 10 songs
✓ YouTube search complete

📋 Playlist: upbeat 80s synthwave for coding

    1. Nightcall - Kavinsky ✓
    2. A Real Hero - College & Electric Youth ✓
    3. Sunset - The Midnight ✓
    4. Tech Noir - Gunship ✓
    5. Turbo Killer - Carpenter Brut ✓
    6. Running in the Night - FM-84 ✓
    7. Resonance - HOME ✓
    8. The Darkness - Perturbator ✓
    9. Blizzard - Kavinsky ✓
   10. Crystals - M|O|O|N ✓

▶️  Play your playlist:

   https://www.youtube.com/watch_videos?video_ids=MV_3Dpw-BRY,_kFz1MOUFQ8,...

   10 songs ready to play
```

## Quick Start

```bash
# Install globally
npm install -g mixaroo-lite

# Or via Homebrew (macOS)
brew tap schoolofai/tap
brew install mixaroo-lite

# Set up your AI provider (one-time)
mx-lite setup

# Generate a playlist
mx-lite "chill lo-fi beats for coding at 3am"
```

That's it. Click the link, start listening.

## Features

- 🤖 **AI-Powered** — Uses OpenAI, Google Gemini, or Anthropic Claude to curate playlists
- ▶️ **Instant Playback** — Generates YouTube playlist links you can open immediately
- 🔐 **Secure** — API keys stored locally in your system config directory
- 🎚️ **Customizable** — Request 1 to 100 songs per playlist
- ⚡ **Fast** — Uses the cheapest, fastest models (gpt-4o-mini, gemini-1.5-flash, claude-3-haiku)
- 💾 **Saved Playlists** — Save and replay your favorite generated playlists
- 📜 **History** — Browse and re-open previously generated playlists

## Installation

### Homebrew (macOS)

```bash
brew tap schoolofai/tap
brew install mixaroo-lite
```

### npm

```bash
npm install -g mixaroo-lite
```

### npx (no install)

```bash
npx mixaroo-lite "your prompt here"
```

### Requirements

- **macOS, Linux, or Windows**
- Node.js 18 or higher
- An API key from OpenAI, Google, or Anthropic

## Usage

### Setup

First time? Run setup to configure your AI provider:

```bash
mx-lite setup
```

You'll be asked to:
1. Choose your AI provider (OpenAI, Gemini, or Anthropic)
2. Enter your API key

The key is validated before saving. Config is stored in `~/.config/mixaroo-lite-nodejs/`.

### Generate Playlists

Just describe what you want:

```bash
mx-lite "upbeat 80s synthwave for late night coding"
```

**More examples:**

```bash
mx-lite "songs that feel like sunshine and road trips"
mx-lite "angry workout music that goes hard"
mx-lite "jazz standards for a dinner party"
mx-lite "sad indie songs for when it's raining"
mx-lite "música latina para una fiesta"
mx-lite "deep house for sunday morning cleaning"
mx-lite "nostalgic video game soundtracks"
```

### Options

```bash
# Custom playlist length (default: 25, max: 100)
mx-lite "punk rock" --length 50
mx-lite "ambient" -l 10

# Override your default provider
mx-lite "classical" --provider gemini
mx-lite "hip hop" -p anthropic
```

### Config Commands

```bash
# View current configuration
mx-lite config show

# View config as JSON
mx-lite config show --json

# Reset everything
mx-lite config reset

# Set default playlist length
mx-lite config set default-length 50

# Show config file location
mx-lite config path
```

## Shell Completions

Enable tab completion for all commands and flags:

### Bash

```bash
# Add to ~/.bashrc
eval "$(mx-lite completions bash)"
```

### Zsh

```bash
# Add to ~/.zshrc
eval "$(mx-lite completions zsh)"
```

### Fish

```bash
# Save to completions directory
mx-lite completions fish > ~/.config/fish/completions/mx-lite.fish
```

## Troubleshooting

### "Invalid API key"

Your key might be expired or incorrectly entered. Get a new one:

- **OpenAI**: https://platform.openai.com/api-keys
- **Gemini**: https://makersuite.google.com/app/apikey
- **Anthropic**: https://console.anthropic.com/

Then run `mx-lite setup` again.

### "Rate limit exceeded"

You've hit your provider's rate limit. Wait a minute and try again, or switch providers.

### "Not configured"

Run `mx-lite setup` to set up your AI provider and API key.

### Some songs not found on YouTube

This happens! The AI might suggest obscure tracks or songs with names that don't match YouTube's index exactly. The playlist will still work with the songs that were found.

### Reset everything

```bash
mx-lite config reset
```

## API Keys

You'll need an API key from one of these providers:

| Provider | Model Used | Get Your Key |
|----------|------------|--------------|
| OpenAI | gpt-4o-mini | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | gemini-1.5-flash | [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) |
| Anthropic | claude-3-haiku | [console.anthropic.com](https://console.anthropic.com/) |

All three use their cheapest/fastest models to keep costs minimal.

## Platform Support

| Platform | Status |
|----------|--------|
| macOS | ✅ Supported |
| Linux | ✅ Supported |
| Windows | ✅ Supported |

## Contributing

Contributions welcome! Here's how to get started:

```bash
# Clone the repo
git clone https://github.com/schoolofai/mixaroo-lite.git
cd mixaroo-lite

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run locally
node dist/cli.js "test prompt"
```

**Before submitting a PR:**

1. Make sure `npm test` passes
2. Run `npm run build` to verify the build
3. Add tests for new features
4. Keep commits focused and well-described

Found a bug? [Open an issue](https://github.com/schoolofai/mixaroo-lite/issues). Have a feature idea? We'd love to hear it.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

MIT © [School of AI](https://github.com/schoolofai)

---

**Made with 🎵 by developers who got tired of searching for songs one by one.**
