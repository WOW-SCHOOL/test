# CHANGELOG_UPGRADE.md

## Добавлено / исправлено

- Добавлен текущий стандарт доступа WOW SCHOOL: `PIN_CODE.js` → `pin-gate.js` → `app.js`, PIN `1020`.
- Добавлены `favicon.png` и `favicon.ico`; favicon подключён в основной и standalone-версии.
- Добавлен отдельный безопасный слой `upgrade-v4.js`: исходный `app.js` не переписывался.
- Добавлены уместные student-facing helpers под левую визуальную область в первых учебных блоках.
- В Listening добавлен раскрываемый **«Открыть текст диалога»** из уже существующих `data.listening.scripts`; speaker labels показываются как имена / роли, а не `A / B`.
- Existing TTS не менялся: transcript — только визуальный helper, speaker labels в аудио не добавлялись.
- Добавлены скрытые QA-shortcuts: `Alt + Shift + ←/→` для задания и `Alt + Ctrl + ←/→` для блока.
- Добавлены `focus-visible`, мягкие hover / active states, короткий success pulse и лёгкое появление screen content.
- Сохранён reduced-motion режим; длинный helper прокручивается внутри собственной области.
- обновлена существующая standalone-версия без переписывания её исходного app script.

## Сознательно не менялось

- Тема и порядок 7 учебных блоков.
- Типы упражнений и их working mechanics.
- Educational data, correct answers и scoring.
- Исходный `app.js` — сохранён byte-for-byte.
- Существующие изображения, их filenames и содержимое.
- Working British English TTS / voice provider logic.
- Progress, results, localStorage и reset logic.
- Canvas `1600×900` и существующий fit logic.
- Глобальная палитра, WOW SCHOOL shell и визуальная идентичность модуля.
- Текущий folder / GitHub path `WOW_Beginner_Unit1B_FINAL_V2`.

### Safe visual polish

Только локальный Level B: состояния существующих интерактивных элементов, клавиатурный focus, короткая реакция на правильный ответ, мягкий entrance и аккуратное раскрытие helpers. Structural redesign не выполнялся.
