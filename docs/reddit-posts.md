# Reddit Launch Posts

## r/commandline

**Title:** I made a CLI that turns text prompts into YouTube playlists using AI

**Body:**

I got tired of the search-queue-repeat loop when building playlists, so I built `mixaroo-lite` — a terminal tool where you describe a vibe and get a playable YouTube playlist link.

```
$ mx-lite "90s grunge deep cuts"

🎵 Generating 25 songs...
✓ 25 songs ready

▶️ https://www.youtube.com/watch_videos?video_ids=...
```

**How it works:**
- Send your prompt to an LLM (OpenAI, Gemini, or Anthropic — whichever you have a key for)
- AI returns a list of `{title, artist}` pairs
- Each track is searched on YouTube via `yt-search` (no YouTube API key needed)
- Video IDs get concatenated into a `watch_videos` URL — click and play

**Install:**
```bash
npm install -g mixaroo-lite
mx-lite setup   # pick provider, paste API key
mx-lite "jazz for rainy afternoons"
```

Uses the cheapest models (gpt-4o-mini, gemini-flash, claude-haiku) so each playlist costs basically nothing.

**Limitations I'll be upfront about:**
- The "playlist" is a `watch_videos` URL, not a real YouTube playlist (no OAuth needed this way)
- YouTube search misses ~10% of tracks, especially obscure ones — they just get skipped
- The AI occasionally hallucinates songs that don't exist

Source: https://github.com/schoolofai/mixaroo-lite

Happy to answer questions about the implementation.

---

## r/node

**Title:** mixaroo-lite — TypeScript CLI that generates YouTube playlists from text prompts

**Body:**

Built a CLI tool in TypeScript that takes a text prompt, asks an LLM for song suggestions, searches YouTube for each one, and gives you a single playable link.

**Stack:**
- **Commander.js** for CLI parsing (default argument = prompt, so `mx-lite "chill vibes"` just works)
- **OpenAI / Google Generative AI / Anthropic SDKs** — supports all three, user picks during setup
- **yt-search** for YouTube lookups (HTML scraping, no API key needed)
- **conf** for XDG-compliant config storage (`chmod 600` on the config file since it holds API keys)
- **Vitest** for testing
- **TypeScript** with ESM modules

**Interesting implementation bits:**

The AI prompt asks for raw JSON, but models don't always listen. So we parse defensively — strip markdown code blocks, regex for the JSON array, and handle whatever the model actually returns:

```typescript
const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
if (arrayMatch) jsonStr = arrayMatch[0];
```

YouTube search tries three query variations per track (`"Artist - Title"`, `"Title Artist"`, `"Artist Title official"`) and takes the first hit. ~90% match rate on popular music.

The playlist URL uses YouTube's `watch_videos?video_ids=` endpoint — an undocumented-ish feature that creates an ephemeral auto-playlist from video IDs. No OAuth, no playlist management. Tradeoff: playlists aren't saved.

```bash
npm install -g mixaroo-lite
```

GitHub: https://github.com/schoolofai/mixaroo-lite

Would love feedback on the architecture. PRs welcome.

---

## r/programming

**Title:** How cheapest-tier LLMs + YouTube scraping = a surprisingly useful playlist generator CLI

**Body:**

I built a small CLI tool called [mixaroo-lite](https://github.com/schoolofai/mixaroo-lite) that takes a text prompt like `"90s rock road trip anthems"` and outputs a clickable YouTube playlist link with 25 tracks.

The interesting part isn't the tool itself — it's how little you need from an LLM to get a useful result.

**The pipeline:**

1. Send prompt to an LLM asking for a JSON array of `{title, artist}` pairs
2. Search YouTube for each track (HTML scraping via `yt-search`, no API key)
3. Concatenate video IDs into a `watch_videos` URL

That's it. Three API calls total (one to the LLM, N to YouTube search).

**Why it works with cheap models:**

Song curation is a sweet spot for LLMs — they've absorbed massive amounts of music knowledge from the training data, and generating a themed list of real songs doesn't require complex reasoning. gpt-4o-mini, gemini-1.5-flash, and claude-3-haiku all perform nearly identically for this task. Cost per playlist is effectively zero.

**Where it breaks:**

- LLMs occasionally hallucinate songs (maybe 1-2 per playlist). YouTube search acts as a natural filter — fake songs just don't match anything.
- The `watch_videos` URL is an unofficial YouTube endpoint. It works today, could break tomorrow.
- Obscure tracks have lower match rates since `yt-search` scrapes YouTube's HTML search results.

**The defensive parsing problem:**

Every LLM integration tutorial shows a clean JSON response. In practice, models wrap JSON in markdown code blocks, add explanatory text before/after, or randomly change formatting between calls. You need to handle all of it:

```typescript
// Strip markdown, find the array, parse whatever's left
const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
```

This is probably the most reusable pattern from the whole project.

TypeScript, MIT licensed: https://github.com/schoolofai/mixaroo-lite

---

## Posting Notes

**r/commandline:**
- Self-posts encouraged, show the tool in action
- Be upfront about limitations — this community values honesty
- Respond to every comment

**r/node:**
- Focus on the technical stack and implementation
- TypeScript + ESM is relevant to the audience
- Link to specific source files if asked

**r/programming:**
- Lead with the interesting engineering angle, not the tool itself
- "Defensive LLM parsing" and "cheap models for narrow tasks" are broadly relevant topics
- Expect skepticism — don't be defensive, agree with valid criticisms
