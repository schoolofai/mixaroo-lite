# How I Built a CLI That Turns Prompts Into YouTube Playlists

You describe a vibe. You get a playlist. That's it.

```
$ mx-lite "90s rock road trip anthems"
▶️ 25 songs ready to play
```

I built [mixaroo-lite](https://github.com/schoolofai/mixaroo-lite) because I kept doing the same dance: think of a mood, open YouTube, search for songs one at a time, add them to a playlist, realize YouTube's recommendations were pulling me off-theme. Twenty minutes later I'd have 8 songs and lost momentum.

What if I could just *describe* what I wanted and get a link?

## The Architecture (It's Simpler Than You Think)

The whole flow is three steps:

1. **Prompt → AI → Song list** — Send a prompt to an LLM, get back a JSON array of `{title, artist}` pairs
2. **Song list → YouTube search** — Look up each track on YouTube via `yt-search`
3. **Video IDs → Playlist URL** — Concatenate IDs into a `watch_videos?video_ids=` link

That's the entire app. The interesting parts are in the decisions, not the code.

## Why Three AI Providers?

Most CLI tools pick one AI provider and call it done. mixaroo-lite supports OpenAI, Google Gemini, and Anthropic Claude. Not because more is better — because **the cheapest model you already have a key for** is the right one for this job.

Generating a list of 25 songs doesn't need GPT-4 or Claude Opus. It needs a model that knows music and can output clean JSON. So we use the budget tier everywhere:

- **gpt-4o-mini** for OpenAI
- **gemini-1.5-flash** for Google
- **claude-3-haiku** for Anthropic

A typical playlist costs fractions of a cent. By supporting all three, we meet developers where they are — most already have at least one API key lying around.

The implementation uses a shared interface (`AIService`) with a single `generatePlaylist` method. Each provider gets its own class that handles the SDK quirks, but the prompt is identical. The system prompt asks for raw JSON with no markdown wrapping — and then we parse defensively anyway, stripping code blocks and hunting for the array if the model gets chatty.

```typescript
function parseAIResponse(response: string): Song[] {
  let jsonStr = response.trim();
  // Remove markdown code blocks if present
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
  // Find the JSON array even if there's surrounding text
  const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
  if (arrayMatch) jsonStr = arrayMatch[0];
  return JSON.parse(jsonStr);
}
```

Defensive parsing is the unsung hero of LLM integrations. Models *will* ignore your instructions sometimes. Handle it.

## The YouTube URL Workaround

Here's the honest part: mixaroo-lite doesn't create real YouTube playlists. That would require OAuth, a Google Cloud project, and user consent flows — way too heavy for a CLI that should work in 30 seconds.

Instead, we use YouTube's `watch_videos` endpoint:

```
https://www.youtube.com/watch_videos?video_ids=dQw4w9WcXgQ,9bZkp7q19f0,...
```

This creates an ephemeral auto-playlist from a list of video IDs. No authentication, no API key, no playlist management. You click it, it plays. The tradeoff is that these playlists aren't saved anywhere — they're throwaway by design. For a "vibe check" playlist you'll listen to once during a coding session, that's perfect.

## YouTube Search Without an API Key

The `yt-search` library does HTML scraping rather than hitting the YouTube Data API. That means:

- **No API key required** — one less setup step
- **No quota limits** — YouTube's Data API has notoriously stingy quotas
- **Slightly fragile** — if YouTube changes their HTML, it breaks

For each song, we try three search query variations: `"Artist - Title"`, `"Title Artist"`, and `"Artist Title official"`. First hit wins. This works surprisingly well for popular tracks (~90% match rate) but struggles with obscure or commonly-named songs. When a search fails, we skip that track and move on — better a 23-song playlist than an error.

## Commander.js and the `conf` Library

Two boring but important choices:

**Commander.js** for CLI parsing. It's the standard for a reason — great TypeScript support, subcommands work naturally (`mx-lite setup`, `mx-lite config show`), and the default argument becomes the main command. That means `mx-lite "chill vibes"` just works without a `generate` subcommand.

**conf** for configuration storage. It gives you XDG-compliant config paths out of the box (`~/.config/mixaroo-lite/` on Linux, `~/Library/Preferences/` on macOS). API keys are stored locally, never transmitted anywhere except to your chosen AI provider. We also `chmod 600` the config file on creation because API keys in world-readable files are a bad time.

## Lessons Learned

**LLMs are great at music curation.** This was the bet, and it paid off. Even the cheapest models have absorbed enough of the internet's music knowledge to generate cohesive, interesting playlists. They're better at "vibe" descriptions than keyword matching ever could be.

**LLMs sometimes invent songs.** Not often, but it happens — especially for niche genres. The model will confidently return a track that doesn't exist. YouTube search acts as a natural filter here: if the song is fake, the search fails, and we skip it. No harm done.

**The YouTube `watch_videos` URL has a soft limit around 50 videos.** We cap the default at 25 and max at 100, but very long playlists may get truncated by YouTube. Good enough for v1.

**Interactive setup matters.** The `mx-lite setup` command walks you through picking a provider and pasting your API key. It's maybe 30 seconds of your time. Without it, you'd be reading docs to figure out environment variables or config file locations. For a CLI tool, the gap between "installed" and "first use" should be as small as possible.

## What's Next

The roadmap is short:

- **Spotify integration** — Create actual Spotify playlists (the OAuth dance is unavoidable here, but worth it)
- **Save/load** — Save playlists locally so you can replay favorites
- **Expand** — `mx-lite expand` to add more songs matching an existing playlist's vibe

## Try It

```bash
npm install -g mixaroo-lite
mx-lite setup
mx-lite "jazz standards that make you feel like you're in a noir film"
```

The whole thing is [open source on GitHub](https://github.com/schoolofai/mixaroo-lite). It's ~500 lines of TypeScript doing something that feels like magic the first time you run it.

That's the fun part about building with LLMs — sometimes the simplest integration produces the most satisfying result.
