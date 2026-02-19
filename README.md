# 🎵 mixaroo-lite

**Turn any prompt into a YouTube playlist. From your terminal.**

[![npm version](https://img.shields.io/npm/v/mixaroo-lite.svg)](https://www.npmjs.com/package/mixaroo-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/mixaroo-lite.svg)](https://nodejs.org/)

> ⚠️ **Currently macOS only.** Linux and Windows support coming soon.

---

```
$ mx-lite "90s rock road trip anthems"

🎵 Generating 25 songs for: "90s rock road trip anthems"
   Using OpenAI (gpt-4o-mini)

✓ Generated 25 songs
✓ YouTube search complete

📋 Playlist: 90s rock road trip anthems

    1. Smells Like Teen Spirit - Nirvana ✓
    2. Wonderwall - Oasis ✓
    3. Under the Bridge - Red Hot Chili Peppers ✓
    ...

▶️  Play your playlist:

   https://www.youtube.com/watch_videos?video_ids=...

   25 songs ready to play
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

- **macOS** (Linux/Windows coming soon)
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

The key is validated before saving. Config is stored in `~/.config/mixaroo-lite/`.

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
| Linux | 🔜 Coming soon |
| Windows | 🔜 Coming soon |

## Contributing

Found a bug? Have an idea? PRs welcome!

```bash
# Clone the repo
git clone https://github.com/schoolofai/mixaroo-lite.git
cd mixaroo-lite

# Install dependencies
npm install

# Build
npm run build

# Run locally
node dist/cli.js "test prompt"
```

## License

MIT © [School of AI](https://github.com/schoolofai)

---

**Made with 🎵 by developers who got tired of searching for songs one by one.**
