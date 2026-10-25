# RG Ballet

Адаптивный сайт балетной школы по макетам Figma для разрешений 1920 и 360 px с собственной адаптацией промежуточных размеров.

## Технологии

- Astro.
- HTML, обычный CSS и Vanilla JavaScript.
- Без React, UI-фреймворков и Tailwind.
- Изображения сайта: `public/images`.
- Шрифты: `public/fonts`.
- Исходные макеты и другие локальные материалы: `.initial_data` — не входят в Git.

## Локальная разработка

```bash
npm install
npm run dev
```

Проверка производственной сборки:

```bash
npm run build
```

Готовые статические файлы создаются в `dist`.

## Размещение

Сайт размещается на Timeweb по основному адресу `https://rgballet.ru/`. Домен зарегистрирован через REG.RU.

Схема публикации: локальная разработка → GitHub → сборка Astro → Timeweb. GitHub Actions публикует содержимое `dist` через `.github/workflows/deploy-timeweb.yml`.

## Документация

- [Техническое задание](docs/TZ.md)
- [Архитектура](docs/ARCHITECTURE.md)
- [Нерешённые вопросы](docs/QUESTIONS.md)

