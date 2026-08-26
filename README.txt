GRAMMAR SWITCHBOARD — HOLST PREVIEW VERSION

Upload these THREE files to the ROOT of the GitHub repository:
1) index.html
2) preview.png
3) oembed.json

After GitHub Pages updates, in Holst DELETE the old iframe object and create a NEW one.

RECOMMENDED first attempt:
Paste this URL into Holst's "Встроить код iFrame" field:
https://wow-school.github.io/test/?v=3

Why URL first:
The page now advertises an oEmbed JSON endpoint. oEmbed includes thumbnail_url,
the same mechanism Wordwall documents for link/embed previews.

If Holst requires iframe markup, use HOLST_IFRAME_CODE.txt.

The ?v=3 query is intentional: it helps avoid Holst reusing the old cached preview.
