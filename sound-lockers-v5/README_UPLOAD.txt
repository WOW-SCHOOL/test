SOUND LOCKERS v5 — SELF-CONTAINED FIX

WHY THIS VERSION:
The background photo is embedded directly inside index.html.
There is NO dependency on assets/lockers-bg.webp, so the visual cannot disappear
because an assets folder was missed during a GitHub merge/upload.

The Holst preview is supplied separately through:
- preview.png
- oembed.json

UPLOAD:
1. In the SAME repository WOW-SCHOOL/test, create a NEW folder:
   sound-lockers-v5
2. Upload the THREE required files from this folder:
   index.html
   preview.png
   oembed.json
   (You may also upload the TXT helper files.)
3. Wait for GitHub Pages to deploy.
4. In Holst create a NEW embed object with:
   https://wow-school.github.io/test/sound-lockers-v5/?v=5

Do not overwrite the conflicted sound-lockers folder for this test.
Using a brand-new folder avoids both the previous merge conflict and old Holst cache.

Nothing in the exercise mechanics/design was intentionally changed here.
This package is based on the latest v4 precision-fix code.
