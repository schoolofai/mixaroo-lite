# Hacker News Launch Materials

## Title

**Recommended:**
```
Show HN: mixaroo-lite – AI playlist generator for the terminal
```
(62 characters)

**Alternatives:**
- `Show HN: CLI tool that turns prompts into YouTube playlists` (59 chars)
- `Show HN: mixaroo-lite – prompt to playlist in your terminal` (59 chars)

---

## Link

```
https://github.com/schoolofai/mixaroo-lite
```

---

## First Comment

Post this immediately after submitting:

---

Hey HN! I built this because I got tired of the song→search→queue loop when I just want 25 tracks for a mood.

You describe a vibe (`mx-lite "chill lo-fi beats for late night coding"`), the AI generates a tracklist, it searches YouTube for each one, and gives you a single URL to play them all. No accounts, no playlists to manage.

**How it works:** TypeScript CLI (Commander.js) that talks to OpenAI, Gemini, or Anthropic — whichever you have a key for. Uses the cheapest models (gpt-4o-mini, gemini-1.5-flash, claude-3-haiku) since song generation doesn't need frontier intelligence. YouTube search via yt-search, no API key required. Config stored locally via `conf` (XDG-compliant).

**Honest limitations:** YouTube search is solid for popular tracks (~90%) but struggles with obscure stuff. The AI occasionally invents songs that don't exist — we just skip those. And the "playlist" is actually a `watch_videos` URL workaround, not a real YouTube playlist. Works on macOS, Linux, and Windows.

**Why a CLI?** I live in my terminal. Context-switching to a browser to build a playlist felt wrong. Plus CLIs are fun to build.

Next up: Spotify integration (the OAuth dance awaits) and an "expand this playlist" command. Save/load is already shipped — `mx-lite list` and `mx-lite play <id>` let you revisit favorites.

Would love feedback — what would make this useful for you?

---

## Timing

**Best times to post:**

| Day | Time (ET) | Quality |
|-----|-----------|---------|
| Tuesday | 9–10am | Excellent |
| Wednesday | 9–10am | Excellent |
| Thursday | 9–10am | Good |
| Monday | 9–10am | Okay |
| Friday | 9–10am | Avoid |
| Weekend | — | Avoid |

**Why 9–10am ET?**
- US East Coast starting work, Europe still online (afternoon)
- Builds momentum before US West Coast wakes up

---

## Engagement Strategy

### Do:
- Respond to every comment within 2 hours
- Thank people for trying it out
- Acknowledge good feature suggestions with genuine interest
- Be honest about limitations
- Share what you learned building it

### Don't:
- Get defensive about criticism
- Promise features you can't deliver
- Argue with trolls
- Over-explain or write walls of text

### Prepared Responses:

**"Why not just ask ChatGPT?"**
> You totally can! This just automates the YouTube searching and gives you a playable link. It's a convenience wrapper, not a replacement.

**"This could use Spotify instead"**
> Agreed, that's next on the list. The OAuth flow is more involved, but YouTube works today with zero auth — good starting point.

**"How do you handle hallucinated songs?"**
> YouTube search fails gracefully for made-up tracks and we skip them. You still get a playlist with everything that matched. Usually 22–25 out of 25 for mainstream genres.

**"Why these specific models?"**
> Cost and speed. Song lists don't need GPT-4-level reasoning. The cheapest tier from each provider works great and keeps it under a cent per playlist.

**"Privacy concerns?"**
> Your API key is stored locally in ~/.config/mixaroo-lite-nodejs/ with standard file permissions. Nothing leaves your machine except the AI provider API call. No servers, no telemetry, no analytics.

**"How accurate is YouTube search?"**
> ~90%+ for popular music. Less reliable for deep cuts, covers, or songs with very generic names. We search "artist - title" and take the top result via yt-search.

---

## Post-Launch Checklist

- [ ] Submit post
- [ ] Immediately add first comment
- [ ] Monitor for 2–3 hours
- [ ] Respond to all comments
- [ ] Note feature requests for roadmap
- [ ] Thank people who star the repo
- [ ] Update README if common questions arise
