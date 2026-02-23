# mixaroo-lite terminal demo — record with: vhs demo.tape
# Produces: assets/demo.gif
# Requirements: mx-lite installed, API key configured

Output assets/demo.gif

Set FontSize 16
Set Width 800
Set Height 500
Set Theme "Dracula"
Set TypingSpeed 50ms
Set Padding 20

# Clean slate
Hide
Type "export PS1='$ '" Enter
Type "clear" Enter
Show
Sleep 500ms

# Scene 1: Install
Type "npm install -g mixaroo-lite"
Sleep 300ms
Enter
Sleep 2s
# Simulated output (actual install is too long for demo)
# If pre-installed, this will show "up to date"
Sleep 2s

# Scene 2: Generate a playlist
Type `mx-lite "upbeat 80s synthwave for coding" -l 10`
Sleep 500ms
Enter

# Wait for AI generation + YouTube search
Sleep 12s

# Hold on the output so viewers can read
Sleep 4s

# Scene 3: List saved playlists
Type "mx-lite list"
Sleep 300ms
Enter
Sleep 3s

# Final pause
Sleep 2s
