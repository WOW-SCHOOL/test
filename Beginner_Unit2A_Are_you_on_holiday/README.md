# WOW SCHOOL · English File Beginner · Unit 2A
## Are you on holiday?

Exercise-first build. Final lesson visuals will be generated and inserted in the next step.

### Structure
- Preview screen (always opens first)
- Block 1 — Nationalities: 10 tasks
- Block 2 — Grammar: verb **be** with **we / you / they**: 10 tasks
- Block 3 — Country → Nationality listening: 10 tasks
- Block 4 — Useful phrases / real-life mini-dialogues: 8 tasks
- Block 5 — New Reading: 6 questions
- Block 6 — Pronunciation sort: /dʒ/ · /tʃ/ · /ʃ/, 12 shuffled cards
- Block 7 — New Listening: 2 dialogues, 8 questions
- Results — first-attempt score by block + total percentage

### Technical behavior
- 1600×900 logical canvas / 16:9
- no internal vertical scroll
- localStorage progress
- every fresh page open starts from Preview
- first-attempt scoring
- retry after incorrect answer
- Block 6 supports click-to-place and drag/drop
- Block 6 cards are shuffled independently and avoid >2 adjacent cards from one category where possible
- British-English online audio uses the existing WOW SCHOOL audio mechanism; browser speechSynthesis is not used

### Visuals
Generated WOW SCHOOL images are included in `assets/images/` and are already connected to the module. The fallback panels remain in the code only as a backup.

### GitHub Pages folder
`Beginner_Unit2A_Are_you_on_holiday`


Final fix: images fill visual cards without fallback overlap. Audio is live British-English speech synthesis again; local WAV TTS is not used.
