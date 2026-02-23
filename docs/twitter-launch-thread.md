# Twitter/X Launch Thread

## Main Thread (6 tweets)

---

### Tweet 1 (Hook)

```
I built a CLI that turns prompts into YouTube playlists 🎵

"chill lo-fi for 3am coding" → 25 songs, one click

No accounts. No friction. Just vibes.

[ATTACH: demo.gif]
```

**Alt text for GIF:**
> Terminal showing mx-lite generating a 25-song playlist from the prompt "80s synthwave for coding" with a clickable YouTube URL at the end.

---

### Tweet 2 (How it works)

```
How it works:

1. Describe the vibe you want
2. AI picks 25 songs that match
3. YouTube search finds each track
4. One link plays them all

No Spotify OAuth. No YouTube API key. Just npm install and go.
```

---

### Tweet 3 (Prompts)

```
Some prompts that slap:

🌅 "songs that feel like sunshine and road trips"
😤 "angry workout music that goes hard"
🌧️ "sad indie for when it's raining"
🎮 "nostalgic video game soundtracks"
💃 "música latina para una fiesta"
🧠 "jazz that makes you feel like a detective"

The weirder, the better.
```

---

### Tweet 4 (Output)

```
What you actually get:

$ mx-lite "90s rock road trip anthems"

📋 25 songs
1. Smells Like Teen Spirit - Nirvana ✓
2. Wonderwall - Oasis ✓
3. Under the Bridge - RHCP ✓
...

▶️ One YouTube link → plays all 25
```

---

### Tweet 5 (Tech)

```
The boring stuff:

• OpenAI, Gemini, or Anthropic (your pick)
• Uses cheapest models — under 1¢ per playlist
• API key stays on your machine, no telemetry
• YouTube search via yt-search (no API key)
• TypeScript, ~1,700 lines

Simple tools > complex platforms.
```

---

### Tweet 6 (CTA)

```
Try it:

npm install -g mixaroo-lite
mx-lite setup
mx-lite "your vibe here"

⭐ github.com/schoolofai/mixaroo-lite

Works on macOS, Linux, and Windows.

#buildinpublic #opensource #cli
```

---

## Posting Strategy

### Best Times (ET)
| Day | Time | Quality |
|-----|------|---------|
| Tuesday | 8–10am | ⭐⭐⭐ |
| Wednesday | 8–10am | ⭐⭐⭐ |
| Thursday | 8–10am | ⭐⭐ |
| Tuesday | 12–1pm | ⭐⭐ |

### Tips
- Post Tweet 1, wait 30 seconds, reply with Tweet 2
- Continue threading every 30–60 seconds
- Post live (don't schedule) so you can engage immediately
- Quote-tweet your own thread with a short hook later in the day

---

## Visual Assets Checklist

- [ ] Demo GIF (from recording guide)
- [ ] Terminal screenshot of example output (optional backup)
- [ ] All images have alt text

---

## Engagement

**If it gets traction:**
- Reply to comments within 1 hour
- Like every reply
- Answer questions genuinely
- Don't oversell — it's a fun CLI tool, not a platform

**Prepared replies:**

"Does it work with Spotify?"
> Not yet! Spotify integration is next. YouTube works without any OAuth which is why I started there.

"What if a song doesn't exist?"
> The AI sometimes invents tracks. YouTube search fails gracefully for those — you still get a playlist with everything that matched. Usually 22–25 out of 25.

"Why CLI?"
> I live in my terminal! Plus CLIs are fun to build. A web version could happen if there's interest.

---

## Shorter Thread (3 tweets)

For a more concise alternative:

**Tweet 1:**
```
Built a thing: describe a vibe, get a YouTube playlist 🎵

$ mx-lite "chill lo-fi for coding at 3am"

→ 25 songs, one clickable link. Under 1¢.

[GIF]
```

**Tweet 2:**
```
Works with OpenAI, Gemini, or Anthropic.
Cheapest models. API key stays local. No telemetry.

npm install -g mixaroo-lite
```

**Tweet 3:**
```
⭐ github.com/schoolofai/mixaroo-lite

macOS, Linux, and Windows.

#buildinpublic #opensource
```
