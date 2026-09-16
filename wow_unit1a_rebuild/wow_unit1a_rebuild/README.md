# WOW SCHOOL · English File Beginner · Lesson 1A Review

Новая версия мини-сайта для Holst / GitHub Pages.

## Что внутри
- 16:9 slide-based mini-app
- Без вертикального скролла
- 6 учебных блоков + отдельный экран результатов
- Только материал Lesson 1A “A cappuccino, please”
- Без browser speechSynthesis
- Аудио подключается только через MP3-файлы

## Структура
- index.html
- styles.css
- app.js
- assets/audio/audio-map.json
- assets/audio/*.mp3
- iframe.txt

## Аудио
Положите реальные британские MP3 в `assets/audio/` с именами:
- phrases_1.mp3
- numbers_1.mp3
- days_1.mp3
- pronunciation_1.mp3
- listening_1.mp3
- listening_2.mp3

Если файла нет, интерфейс покажет `MP3 пока не добавлен`. Роботизированный TTS не используется.

## GitHub Pages
Разместите папку проекта в репозитории `WOW-SCHOOL/test`, например:
`1-wow-unit1a-rebuild`

После публикации адрес будет:
`https://wow-school.github.io/test/1-wow-unit1a-rebuild/`

## Holst iframe
См. `iframe.txt`.
