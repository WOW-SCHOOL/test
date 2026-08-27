SOUND LOCKERS v3 — READY FOR THE EXISTING WOW-SCHOOL/test REPOSITORY

UPLOAD
Open the existing GitHub repository:
WOW-SCHOOL / test

Open the existing folder:
sound-lockers/

Replace the old Sound Lockers files with EVERYTHING from the sound-lockers folder in this archive,
INCLUDING the assets folder.

Required structure:
sound-lockers/
  index.html
  preview.png
  oembed.json
  HOLST_IFRAME_CODE.txt
  HOLST_URL.txt
  AUDIO_SOURCES.txt
  VOICE_STRATEGY.txt
  assets/
    lockers-bg.webp

GITHUB PAGES URL
https://wow-school.github.io/test/sound-lockers/

HOLST — recommended new object
Delete the previous Sound Lockers object and insert:
https://wow-school.github.io/test/sound-lockers/?v=3

The ?v=3 suffix is intentional so Holst refreshes its preview/cache.

DESIGN
The earlier warm wooden classroom + six colourful lockers has been preserved.
The interactive layer is modernised instead of replacing the design:
- responsive 16:9 composition
- all six lockers stay visible
- no internal scrolling
- bright drop-state glows
- green successful placement and locker unlock state
- drag & drop plus click-to-place fallback
- self-check, reset, progress and finish celebration
- Wordwall-style oEmbed preview

AUDIO
No browser TTS.
The word buttons play real human British-English pronunciation recordings from Wikimedia Commons /
the Shtooka Project. Internet access is required when audio is first played.
