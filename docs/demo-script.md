# Demo GIF Script

**Total duration:** ~25 seconds  
**Goal:** Show install → setup → generate → click

---

## Scene 1: Install (5 seconds)

```
$ npm install -g mixaroo-lite
```

*Wait 2 seconds, then show:*

```
added 142 packages in 3s
```

---

## Scene 2: Setup (8 seconds)

```
$ mx-lite setup
```

*Show the setup prompts:*

```
🎵 mixaroo-lite Setup

? Select your AI provider: (Use arrow keys)
❯ OpenAI (gpt-4o-mini)
  Google Gemini (gemini-1.5-flash)
  Anthropic Claude (claude-3-haiku)
```

*Select OpenAI (press Enter)*

```
? Enter your OpenAI API key: ****************************
```

*Type masked key, press Enter*

```
✓ API key validated successfully!

✅ Setup complete!

   Provider: OpenAI (gpt-4o-mini)
   Config:   ~/.config/mixaroo-lite/

Try it out:
   mx-lite "90s rock road trip"
```

---

## Scene 3: Generate Playlist (10 seconds)

```
$ mx-lite "upbeat 80s synthwave for coding"
```

*Show generation:*

```
🎵 Generating 25 songs for: "upbeat 80s synthwave for coding"
   Using OpenAI (gpt-4o-mini)

⠋ Generating playlist with AI...
```

*Spinner, then:*

```
✓ Generated 25 songs
⠋ Searching YouTube... (12/25) Nightcall
```

*Spinner, then:*

```
✓ YouTube search complete

📋 Playlist: upbeat 80s synthwave for coding

    1. Nightcall - Kavinsky ✓
    2. A Real Hero - College & Electric Youth ✓
    3. Sunset - The Midnight ✓
    4. Tech Noir - Gunship ✓
    5. Turbo Killer - Carpenter Brut ✓
    ...

▶️  Play your playlist:

   https://www.youtube.com/watch_videos?video_ids=MV_3Dpw-BRY,_kFz...

   25 songs ready to play
```

---

## Scene 4: End (2 seconds)

*Hold on the final output with the clickable URL visible*

*Optional: cursor moves to URL, suggesting "click me"*

---

## Timing Summary

| Scene | Duration | What Happens |
|-------|----------|--------------|
| Install | 5s | npm install + success |
| Setup | 8s | Provider select + API key + confirm |
| Generate | 10s | Prompt + AI spinner + YouTube spinner + results |
| End | 2s | Hold on final output |
| **Total** | **25s** | |

---

## Tips for Recording

1. **Pre-configure** a working API key so validation doesn't fail
2. **Use 10 songs** (`-l 10`) for faster demo: `mx-lite "80s synthwave" -l 10`
3. **Pre-cache** the AI response if possible (or accept it'll take a few seconds)
4. **Natural typing speed** — not too slow, not robotic fast
5. **Pause briefly** after each major output so viewers can read

---

## Alternative: Short Version (15 seconds)

Skip setup, assume already configured:

```
$ mx-lite "80s synthwave for coding" -l 10

🎵 Generating 10 songs for: "80s synthwave for coding"

✓ Generated 10 songs
✓ YouTube search complete

📋 Playlist: 80s synthwave for coding

    1. Nightcall - Kavinsky ✓
    2. A Real Hero - College ✓
    ...

▶️  Play your playlist:

   https://www.youtube.com/watch_videos?video_ids=...
```

This is better for Twitter/social where attention spans are shorter.
