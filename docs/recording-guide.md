# Demo Recording Guide

How to record the demo GIF for the README.

---

## Recommended Tools

### Option 1: VHS (Recommended)

[VHS](https://github.com/charmbracelet/vhs) by Charm — scriptable terminal recordings.

```bash
# Install
brew install vhs  # macOS
# or
go install github.com/charmbracelet/vhs@latest

# Record using a .tape file (see demo.tape below)
vhs demo.tape
```

**Pros:** Reproducible, scriptable, great output quality  
**Cons:** Requires Go or Homebrew

### Option 2: Terminalizer

```bash
npm install -g terminalizer

# Record
terminalizer record demo

# Edit config
terminalizer edit demo

# Render to GIF
terminalizer render demo
```

**Pros:** Pure npm, easy to install  
**Cons:** Can be janky, large file sizes

### Option 3: asciinema + svg-term

```bash
# Record
asciinema rec demo.cast

# Convert to SVG (smaller than GIF!)
npm install -g svg-term-cli
svg-term --in demo.cast --out demo.svg --window
```

**Pros:** SVG is tiny and scales perfectly  
**Cons:** Two-step process

### Option 4: Manual (Screen Recording)

Use OBS, QuickTime, or any screen recorder:
1. Record your terminal
2. Convert to GIF with `ffmpeg` or [ezgif.com](https://ezgif.com)

```bash
# ffmpeg conversion
ffmpeg -i demo.mp4 -vf "fps=10,scale=800:-1" -loop 0 demo.gif
```

---

## Terminal Setup

### Theme
Use a popular, readable theme:
- **Dracula** (dark, colorful)
- **Nord** (dark, muted)
- **One Dark** (VS Code default dark)
- **Solarized Dark**
- Default macOS/Linux terminal is fine too

### Font
- **Size:** 16-18pt minimum (must be readable at 600px width)
- **Family:** Any monospace — SF Mono, JetBrains Mono, Fira Code, Menlo

### Window Size
- **Columns:** 80 (standard)
- **Rows:** 24-30
- **Pixel width:** ~800px for the recording

### Clean Up
- Clear terminal history: `clear`
- Use a clean prompt: `PS1='$ '`
- Hide other windows/distractions

---

## VHS Tape File

Save as `demo.tape`:

```tape
# Demo recording for mixaroo-lite
Output demo.gif
Set FontSize 16
Set Width 800
Set Height 500
Set Theme "Dracula"

# Start clean
Type "clear" Enter
Sleep 500ms

# Generate playlist (assumes already configured)
Type "mx-lite \"upbeat 80s synthwave for coding\" -l 10"
Sleep 500ms
Enter
Sleep 8s

# Let output settle
Sleep 2s
```

Run with: `vhs demo.tape`

---

## GIF Optimization

GitHub recommends <5MB for README images. Optimize your GIF:

### Using gifsicle
```bash
gifsicle -O3 --colors 128 --lossy=80 demo.gif -o demo-optimized.gif
```

### Using ezgif.com
1. Upload to [ezgif.com/optimize](https://ezgif.com/optimize)
2. Reduce colors to 128
3. Enable lossy compression
4. Download optimized version

### Target specs
- **Duration:** ≤30 seconds
- **File size:** ≤5MB (ideally ≤2MB)
- **FPS:** 10-15 (lower = smaller)
- **Width:** 600-800px

---

## File Placement

Put the final GIF in the repo:

```
mixaroo-lite/
├── assets/
│   └── demo.gif      # ← here
├── README.md
└── ...
```

Update README.md:
```markdown
![Demo](./assets/demo.gif)
```

---

## Checklist

Before recording:
- [ ] mixaroo-lite installed and working
- [ ] API key configured and validated
- [ ] Terminal theme set
- [ ] Font size readable
- [ ] Window sized appropriately
- [ ] Other apps closed/hidden

After recording:
- [ ] GIF is ≤30 seconds
- [ ] GIF is ≤5MB
- [ ] Text is readable
- [ ] Colors look good
- [ ] No sensitive info visible (API keys masked)

---

## Quick Test Command

For testing your recording setup:

```bash
mx-lite "test playlist for demo" -l 5
```

Uses only 5 songs for fast iteration while setting up your recording.
