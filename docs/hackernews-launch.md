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

Hey HN! I built mixaroo-lite because I got tired of the loop: think of a song → search YouTube → add to queue → repeat 25 times.

**What it does:**

You describe a vibe, it gives you a playlist:

```
$ mx-lite "chill lo-fi beats for late night coding"
```

The AI generates a song list, it searches YouTube for each track, and spits out a playlist URL you can click and play immediately.

**Tech stack:**

- TypeScript/Node.js CLI (Commander.js)
- OpenAI, Gemini, or Anthropic for song generation (uses cheapest models: gpt-4o-mini, gemini-1.5-flash, claude-3-haiku)
- ytsr for YouTube search (no API key needed)
- Config stored locally with `conf` (XDG-compliant)

**Why CLI?**

I live in my terminal. I wanted something I could run without context switching. Also, it's fun to build CLIs.

**What's next:**

- Spotify playlist creation (OAuth flow is... a journey)
- Apple Music support
- "Expand this playlist" command
- Playlist saving/loading

**Known limitations:**

- YouTube search isn't perfect — obscure songs sometimes don't match
- The AI occasionally hallucinates songs that don't exist (it's confident though)
- No actual YouTube playlist creation (uses `watch_videos` URL workaround)

Would love feedback! What features would make this useful for you?

---

## Timing

**Best times to post:**

| Day | Time (ET) | Quality |
|-----|-----------|---------|
| Tuesday | 9-10am | Excellent |
| Wednesday | 9-10am | Excellent |
| Thursday | 9-10am | Good |
| Monday | 9-10am | Okay |
| Friday | 9-10am | Avoid |
| Weekend | - | Avoid |

**Why 9-10am ET?**
- US East Coast starting work
- Europe still online (afternoon)
- Builds momentum before US West Coast wakes up

---

## Engagement Strategy

### Do:
- Respond to every comment within 2 hours
- Thank people for trying it out
- Acknowledge good feature suggestions: "Great idea, adding to the roadmap!"
- Be honest about limitations
- Share what you learned building it

### Don't:
- Get defensive about criticism
- Promise features you can't deliver
- Argue with trolls
- Over-explain or be long-winded

### Responses to keep ready:

**"Why not just ask ChatGPT?"**
> You totally can! This just saves the copy-paste and YouTube searching. Plus it works offline once you have the song list. It's a convenience thing.

**"This could use Spotify instead"**
> Agreed! Spotify integration is on the roadmap. The OAuth flow is a bit involved but it's coming. For now YouTube works without any auth.

**"How do you handle hallucinated songs?"**
> The AI occasionally makes up songs. YouTube search usually fails for those, and we mark them as "not found" in the output. You still get a playlist with the real songs.

**"Why these specific models?"**
> Cost and speed. gpt-4o-mini, gemini-1.5-flash, and claude-3-haiku are the cheapest options from each provider. Song generation doesn't need GPT-4-level intelligence.

**"Privacy concerns?"**
> Your API key is stored locally in ~/.config/mixaroo-lite/ with restrictive permissions. It never leaves your machine except to call the AI provider. We don't have any servers or telemetry.

**"How accurate is YouTube search?"**
> Pretty good for popular songs (90%+). Less reliable for obscure tracks, covers, or songs with generic names. We use the artist + title combo and take the top result.

---

## Post-Launch Checklist

- [ ] Submit post
- [ ] Immediately add first comment
- [ ] Monitor for 2-3 hours
- [ ] Respond to all comments
- [ ] Note feature requests
- [ ] Thank people who star the repo
- [ ] Update README if common questions arise
