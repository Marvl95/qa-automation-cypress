# QA Automation — Cypress

Навчальний проект для E2E-тестування за допомогою [Cypress](https://www.cypress.io/).

## Стек

- Cypress 15 (E2E)
- Node.js 20+

## Встановлення

```bash
npm install
```

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

- `baseUrl` — `https://example.cypress.io`
- `viewport` — 1280×720
- `defaultCommandTimeout` — 8000 мс
- `video` — вимкнено
- `retries` — 1 повтор у `runMode`
