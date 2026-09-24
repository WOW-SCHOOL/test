# CHANGELOG_UPGRADE.md

## Добавлено / исправлено

- Добавлен текущий стандарт доступа WOW SCHOOL: `PIN_CODE.js` + `pin-gate.js`, PIN `1020`, правильный порядок загрузки перед `app.js`.
- Добавлены `favicon.png` и `favicon.ico`, подключены в основной и standalone-версии.
- Добавлены уместные student-facing helpers под левую визуальную область в блоках Words & Phrases, Grammar, Numbers и Days & Goodbye.
- В Listening добавлен раскрываемый transcript из уже существующего source data; видимые спикеры подписаны как **Helen** и **Tom**.
- Логика British English TTS сохранена: при проигрывании диалога читаются только реплики, имена спикеров не озвучиваются.
- Добавлены скрытые QA-shortcuts: Alt+Shift+←/→ для задания и Alt+Ctrl+←/→ для блока.
- Добавлены `focus-visible`, мягкие hover/active states, короткий success pulse и лёгкий entrance transition.
- Сохранён `prefers-reduced-motion`.
- Standalone-версия пересобрана с тем же встроенным набором изображений и обновлённой логикой.

## Сознательно не менялось

- Тема Unit 1A и порядок 7 блоков.
- Типы упражнений и механика прохождения.
- Учебный контент, correct answers и scoring.
- Существующие изображения и их filenames.
- Working British English TTS / online voice provider logic.
- Progress, results, localStorage и reset logic.
- Canvas 1600×900 и существующий fit logic.
- Общая палитра, WOW SCHOOL shell и исходная визуальная идентичность.
- Текущий folder / GitHub path `WOW_Unit1A_WOW_BRANDING_UPDATED_v2`.

### Safe visual polish

Только Level B: локальные состояния существующих кнопок, клавиатурный focus, короткая реакция на правильный ответ, плавное появление screen content и аккуратное раскрытие helpers. Structural redesign не выполнялся.
