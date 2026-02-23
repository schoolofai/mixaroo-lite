# Terminal Demo Output

Polished text demo for use in README, blog posts, and social media.

---

## Full Demo (setup → generate → list → play)

```
$ npm install -g mixaroo-lite
added 142 packages in 3s

$ mx-lite setup
🎵 mixaroo-lite Setup

? Select your AI provider: OpenAI (gpt-4o-mini)
? Enter your OpenAI API key: ****************************
✓ API key validated successfully!

✅ Setup complete!

   Provider: OpenAI (gpt-4o-mini)
   Config:   ~/.config/mixaroo-lite/

Try it out:
   mx-lite "90s rock road trip"

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

💾 Saved: upbeat-80s-synthwave-for-coding (ID: 1)

$ mx-lite list
📋 Saved Playlists

  ID  Name                                Songs  Created
  1   upbeat-80s-synthwave-for-coding     10     just now
  2   90s-rock-road-trip                  25     2 days ago
  3   chill-lofi-beats-for-studying       15     5 days ago

$ mx-lite play 1
▶️  Opening playlist: upbeat 80s synthwave for coding (10 songs)
```

---

## Short Demo (for README hero block)

```
$ mx-lite "upbeat 80s synthwave for coding"

🎵 Generating 25 songs for: "upbeat 80s synthwave for coding"
   Using OpenAI (gpt-4o-mini)

✓ Generated 25 songs
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

## One-liner (for Twitter/social)

```
$ mx-lite "80s synthwave for coding" -l 10
📋 10 songs → click to play: https://youtube.com/watch_videos?video_ids=...
```

---

## Multi-provider showcase

```
$ mx-lite config show
  Provider: OpenAI (gpt-4o-mini)
  Songs:    25 (default)
  Config:   ~/.config/mixaroo-lite/config.json

$ mx-lite "jazz for late nights" --length 15
🎵 Generating 15 songs for: "jazz for late nights"
   Using OpenAI (gpt-4o-mini)

✓ Generated 15 songs
✓ YouTube search complete

📋 Playlist: jazz for late nights

    1. So What - Miles Davis ✓
    2. Take Five - Dave Brubeck ✓
    3. My Favorite Things - John Coltrane ✓
    ...

▶️  Play: https://www.youtube.com/watch_videos?video_ids=...

   15 songs ready to play
```
