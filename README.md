# QA Automation — Cypress

Навчальний проект для E2E-тестування за допомогою [Cypress](https://www.cypress.io/).

## Стек

- Cypress 15 (E2E)
- Node.js 20+

## Встановлення

```bash
npm install
```

## Налаштування доступів

Тестовий сайт закритий HTTP Basic Auth. Креди зберігаються локально у `cypress.env.json`
(цей файл у `.gitignore` і не потрапляє в репозиторій).

Створіть його з шаблону та підставте свої значення:

```bash
cp cypress.env.example.json cypress.env.json
```

```json
{
  "basicAuthUsername": "<your-login>",
  "basicAuthPassword": "<your-password>"
}
```

Значення доступні в тестах через `Cypress.env('basicAuthUsername')` /
`Cypress.env('basicAuthPassword')`.

## Запуск тестів

Інтерактивний режим (Test Runner):

```bash
npm run cy:open
```

Headless-режим (CI / термінал):

```bash
npm run cy:run
```

Запуск у Chrome:

```bash
npm run cy:run:chrome
```

## Структура проекту

```
.
├── cypress.config.js        # конфігурація Cypress (E2E)
├── cypress/
│   ├── e2e/                 # тестові сценарії (*.cy.js)
│   ├── fixtures/            # тестові дані (JSON)
│   └── support/
│       ├── commands.js      # кастомні команди
│       └── e2e.js           # глобальні хуки / імпорти
└── package.json
```

## Конфігурація

Базові налаштування в `cypress.config.js`:

- `baseUrl` — `https://qauto.forstudy.space`
- `viewport` — 1280×720
- `defaultCommandTimeout` — 8000 мс
- `video` — вимкнено
- `retries` — 1 повтор у `runMode`

Креди Basic Auth — у `cypress.env.json` (див. розділ «Налаштування доступів»).
