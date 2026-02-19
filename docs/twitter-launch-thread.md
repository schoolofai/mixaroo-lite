# Twitter/X Launch Thread

## Thread

---

### Tweet 1 (Hook)

```
I built a CLI that turns prompts into YouTube playlists 🎵

"chill lo-fi for 3am coding" → instant playlist

No more searching for songs one by one.

[ATTACH: demo.gif]
```

**Alt text for GIF:**
> Terminal showing mx-lite command generating a playlist of 10 songs from the prompt "80s synthwave for coding" and outputting a clickable YouTube playlist URL.

---

### Tweet 2 (How it works)

```
How it works:

1. Describe the vibe you want
2. AI generates the perfect song list
3. Click the YouTube link and play

That's it. No accounts, no playlists to manage, no friction.
```

---

### Tweet 3 (Examples - Creative)

```
Some prompts I've been using:

🌅 "songs that feel like sunshine and road trips"
😤 "angry workout music that goes hard"
🌧️ "sad indie for when it's raining"
🎮 "nostalgic video game soundtracks"
💃 "música latina para una fiesta"

The weirder the prompt, the better.
```

---

### Tweet 4 (Example - Output)

```
Here's what you get:

$ mx-lite "90s rock road trip anthems"

📋 Playlist:
1. Smells Like Teen Spirit - Nirvana ✓
2. Wonderwall - Oasis ✓
3. Under the Bridge - RHCP ✓
...

▶️ https://youtube.com/watch_videos?video_ids=...

25 songs, one click.
```

---

### Tweet 5 (Tech details)

```
Under the hood:

• Works with OpenAI, Gemini, or Anthropic
• Uses the cheapest models (gpt-4o-mini, etc.)
• API key stored locally, never leaves your machine
• YouTube search via ytsr (no API key needed)
• TypeScript, ~500 lines of code

Simple tools > complex apps.
```

---

### Tweet 6 (CTA)

```
Try it:

npm install -g mixaroo-lite
mx-lite setup
mx-lite "your vibe here"

GitHub: github.com/schoolofai/mixaroo-lite

Star ⭐ if you find it useful!

#buildinpublic #opensource
```

---

## Posting Strategy

### Best Times (ET)
| Day | Time | Quality |
|-----|------|---------|
| Tuesday | 8-10am | ⭐⭐⭐ |
| Wednesday | 8-10am | ⭐⭐⭐ |
| Thursday | 8-10am | ⭐⭐ |
| Tuesday | 12-1pm | ⭐⭐ |

### Tips
- Post Tweet 1, wait 30 seconds, then reply with Tweet 2
- Continue threading every 30-60 seconds
- Don't schedule — post live so you can engage immediately
- Quote-tweet your own thread with a short hook later in the day

---

## Visual Assets Checklist

- [ ] Demo GIF (from recording guide)
- [ ] Terminal screenshot of example output (optional)
- [ ] All images have alt text

---

## Engagement

**If it gets traction:**
- Reply to comments within 1 hour
- Like every reply
- Answer questions genuinely
- Don't oversell — it's a fun side project

**Good replies to have ready:**

"Does it work with Spotify?"
> Not yet! Spotify integration is on the roadmap. YouTube works without any OAuth flow which is why I started there.

"What if a song doesn't exist?"
> The AI sometimes hallucinates. YouTube search fails for those and we mark them "not found" — you still get a playlist with the real songs.

"Why CLI?"
> I live in my terminal! Also it's fun to build. But a web version could happen if there's interest.

---

## Alternative Shorter Thread (3 tweets)

If you want something more concise:

**Tweet 1:**
```
Built a thing: describe a vibe, get a YouTube playlist 🎵

$ mx-lite "chill lo-fi for coding at 3am"

→ 25 songs, one clickable link

[GIF]
```

**Tweet 2:**
```
Works with OpenAI, Gemini, or Anthropic.
Uses the cheapest models.
API key stays on your machine.

npm install -g mixaroo-lite
```

**Tweet 3:**
```
GitHub: github.com/schoolofai/mixaroo-lite

Star if useful ⭐

#buildinpublic
```
