# Rick and Morty

Одностраничное React-приложение для просмотра персонажей вселенной _Rick and Morty_.  
Данные загружаются из публичного [Rick and Morty API](https://rickandmortyapi.com/) и отображаются в виде списка с фильтрацией, бесконечной прокруткой, избранными персонажами и переходом на детальную страницу персонажа.

---

## 🚀 Деплой

| Площадка         | Ссылка                                   |
| ---------------- | ---------------------------------------- |
| **Vercel**       | https://rick-morty-liart-six.vercel.app/ |
| **GitHub Pages** | https://pauline13.github.io/rick-morty/  |

Выкладка на **GitHub Pages** идёт через GitHub Actions (см. ниже). **Vercel** подключён отдельно и не управляется этими workflow.

---

## 🔄 CI/CD (GitHub Actions)

Пайплайн разделён на два workflow:

| Файл | Роль |
| ---- | ---- |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | **CI** — проверки качества кода |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | **CD** — сборка и деплой на GitHub Pages |

### Continuous Integration (`ci.yml`)

Запускается на **pull request** в `master` и на **push** в `master`.

Проверки идут **параллельно** отдельными job’ами; финальный job `check` ждёт всех и служит required status check (merge в `master` блокируется, пока `check` не зелёный):

```text
lint-and-styles ─┐
unit ────────────┤
build ───────────┼──► check
e2e ─────────────┤
storybook ───────┘
```

| Job | Что делает |
| --- | ---------- |
| `lint-and-styles` | ESLint + Stylelint |
| `unit` | Vitest (unit / component) |
| `build` | production-сборка с теми же Vite env, что у Pages (`VITE_BASE_PATH`, `VITE_REMOTE_FAVORITES_URL`) |
| `e2e` | Playwright e2e (Chromium); поднимает Vite через `webServer` |
| `storybook` | Playwright-скриншоты сторис; поднимает Storybook через `webServer` |
| `check` | Агрегатор: успех только если все предыдущие job’ы зелёные |

Окружение CI: **Node.js 24**, `actions/checkout@v5`, `actions/setup-node@v5`, установка зависимостей через `npm ci`.

Для e2e и Storybook в CI дополнительно выполняется `npx playwright install --with-deps chromium`. В скриншот-тестах Storybook на Linux допустим небольшой pixel diff (`maxDiffPixelRatio` в `playwright.storybook.config.ts`), потому что эталоны сняты локально на Windows.

### Continuous Deployment (`deploy.yml`)

Деплой **не** стартует от `push` напрямую. Он подписан на успешное завершение workflow **CI** (`workflow_run`):

1. Push / merge в `master` → запускается **CI**.
2. CI зелёный и событие было `push` → стартует **Deploy to GitHub Pages**.
3. Deploy checkout’ит тот же коммит (`head_sha` из CI), собирает с Pages env, копирует `404.html` для SPA и публикует артефакт.

Также доступен ручной запуск: **Actions → Deploy to GitHub Pages → Run workflow** (`workflow_dispatch`).

Секрет репозитория: `VITE_REMOTE_FAVORITES_URL` — URL `remoteEntry.js` микрофронтенда избранного (используется в CI `build` / `e2e` и в Deploy).

---

## 🛠️ Стек

- **React 19** + **TypeScript**
- **Vite 7** — сборка и dev-сервер
- **GitHub Actions** — CI (lint, unit, e2e, Storybook, build) и CD на GitHub Pages
- **React Router 7** — клиентская маршрутизация
- **TanStack React Query 5** — серверное состояние, кэш, пагинация и запросы к API
- **Zustand** — клиентское состояние (фильтры списка, тема оформления, избранные персонажи)
- **Module Federation** (`@originjs/vite-plugin-federation`) — подключение удалённого микрофронтенда
- **i18next** — интернационализация UI
- **Axios** — HTTP-клиент
- **react-hot-toast** — toast-уведомления об ошибках
- **Sass (SCSS)** — стили
- **Storybook** — изолированная разработка и проверка UI-компонентов
- **Vitest** + **Testing Library** + **jsdom** — unit- и component-тесты
- **Playwright** — e2e-тесты в браузере
- **ESLint** + **Stylelint** + **Prettier** — линтинг и форматирование
- **Docker Compose** + **Make** — локальный запуск host и микрофронтенда в контейнерах
- **vite-plugin-svgr** + **vite-plugin-image-optimizer** — оптимизация ассетов
- **vite-plugin-pwa** + **Workbox** — PWA: манифест, service worker, кэширование
- **vite-bundle-analyzer** — анализ бандла

---

## 🏗️ Архитектура

Проект организован по принципам **Feature-Sliced Design**:

```
src/
├── app/         # инициализация: точка входа, провайдеры, роутинг, layout
├── pages/       # страницы (CharactersPage, CharacterInfoPage, NotFoundPage)
├── widgets/     # UI-блоки (Header, Footer, FiltersPanel, FavoriteCharacters, переключатели)
├── entities/    # бизнес-сущности (character: api, model, hooks)
├── stores/      # клиентское состояние: фильтры персонажей, тема, избранное
├── remotes/     # типы и контракты для удалённых микрофронтендов
└── shared/      # переиспользуемое: api, components, hooks, helpers, constants, assets, types
```

---

## 🧩 Микрофронтенды

Приложение работает как **host app** и подключает удалённый модуль `remote_app/FavoriteCharacters` через Module Federation.

Микрофронт избранного деплоится отдельно (на Vercel) и отдаёт `remoteEntry.js`. Host загружает его по URL из `VITE_REMOTE_FAVORITES_URL`.

**Локальная разработка:** если переменная не задана, используется dev-дефолт из `federation.config.ts` — `http://localhost:5001/assets/remoteEntry.js`. Нужно, чтобы remote-приложение было запущено локально.

Host передаёт в remote список избранных персонажей, обработчик удаления, обработчик перехода на детальную страницу и локализованный текст пустого состояния.

---

## 📦 Установка

Для обычного локального запуска установите зависимости и запустите dev-сервер:

```bash
npm install
npm run dev
```

---

## 🐳 Запуск в Docker

Docker Compose запускает два сервиса:

- `host` — основное приложение на http://localhost:5173;
- `favorites` — микрофронтенд избранных персонажей на http://localhost:5001.

Репозитории host и микрофронтенда должны находиться рядом:

```text
<project-directory>/
├── rick-morty/
└── rick-morty-favorites-mf/
```

Для запуска необходимы **Docker с Docker Compose** и, при использовании команд из `Makefile`, **Make**.

```bash
make docker-build-dev   # собрать dev-образы
make docker-up-dev      # запустить оба приложения
make docker-stop-dev    # остановить контейнеры без удаления
make docker-start-dev   # повторно запустить существующие контейнеры
make docker-down        # остановить и удалить контейнеры проекта
```

Без Make те же операции можно выполнять напрямую:

```bash
docker compose --profile dev build
docker compose --profile dev up host
docker compose --profile dev stop
docker compose --profile dev down
```

Исходный код подключается в контейнеры через bind mounts, а зависимости хранятся в отдельных Docker volumes. Для стабильного hot reload host-приложение использует polling в настройках Vite.

---

## 📜 Скрипты

```bash
npm run dev               # запуск dev-сервера (Vite)
npm run build             # typecheck (tsc -b) + сборка production-версии
npm run build:analyze     # сборка с визуализацией бандла (vite-bundle-analyzer)
npm run preview           # локальный предпросмотр production-сборки

npm run lint              # проверка ESLint
npm run lint:fix          # автофиксы ESLint

npm run lint:styles       # проверка Stylelint (scss/css)
npm run lint:styles:fix   # автофиксы Stylelint

npm run prettier          # форматирование проекта через Prettier

npm run storybook         # запуск Storybook на 6006 порту
npm run build:storybook   # сборка Storybook
```

---

## 🧪 Тесты

### Unit и component (Vitest)

Стек: **Vitest**, **Testing Library**, окружение **jsdom** (`@testing-library/jest-dom` подключается в `vitest.setup.ts`).

```bash
npm run test              # однократный прогон тестов (Vitest)
npm run test:watch        # тесты в watch-режиме
npm run test:coverage     # прогон с отчётом покрытия (v8)
```

Отчёт `test:coverage` выводится в консоль (`text`) и сохраняется в HTML в каталог `coverage/`.

### E2E (Playwright)

Сценарии в `tests/e2e/`. Ответы API мокируются через `page.route`, dev-сервер поднимается автоматически (`webServer` в `playwright.config.ts`). Проект: **Chromium**.

Перед первым запуском необходимо установить браузер:

```bash
npx playwright install chromium
```

```bash
npm run test:e2e          # прогон e2e-тестов (Playwright)
npm run test:e2e:ui       # интерактивный UI-режим Playwright
```

HTML-отчёт сохраняется в `playwright-report/` (артефакты прогона — в `test-results/`).

### Storybook tests

```bash
npm run test:storybook          # Playwright-тесты компонентов в Storybook
npm run test:storybook:update   # обновление снапшотов Storybook-тестов
```

---

## ✨ Функционал

- Список персонажей: загрузка и пагинация через **TanStack React Query** (`useInfiniteQuery`)
- Фильтрация по **имени**, **статусу**, **виду** и **полу**; состояние фильтров в **Zustand**
- Debounce поискового запроса по имени
- Бесконечная прокрутка: `IntersectionObserver` + `fetchNextPage` из React Query
- Добавление персонажей в избранное из карточки: состояние хранится в **Zustand persist** (`favorite-characters`) и сохраняется между сессиями
- Виджет избранных персонажей в header: удалённый микрофронтенд показывает список, позволяет удалить персонажа из избранного и перейти на его детальную страницу
- Retry запросов: глобальные настройки `QueryClient` и выборочный retry для детальной страницы (сетевые, серверные и rate-limit ошибки)
- Детальная страница персонажа через `useQuery`; при 404 — редирект на страницу «не найдено»
- Локальное редактирование карточки без сохранения в API — обновление кэша React Query (`setQueryData`)
- Обработка ошибок через toast-уведомления (`react-hot-toast`)
- `ErrorBoundary` на верхнем уровне с возможностью перезагрузить страницу
- Страница 404 для несуществующих роутов
- Отмена устаревших запросов: `AbortSignal` в `queryFn`, управляется React Query при смене параметров и размонтировании
- Локализация интерфейса (**i18next**): языки **en** и **ru**, выбор сохраняется между сессиями; при первом заходе — определение языка из настроек браузера. Переводится UI; данные с API (имена персонажей и т.п.) не локализуются
- Светлая и тёмная тема (**light** / **dark**): переключение сохраняется; при первом заходе — по системной настройке `prefers-color-scheme`
- **PWA**: установка на устройство, `display: standalone`, автообновление service worker (`registerType: autoUpdate`); runtime-кэш аватаров, API и Google Fonts через Workbox
- **Адаптивная верстка**: брейкпоинты mobile (≤767px) и tablet (≤1023px); на мобильных дополнительные фильтры сворачиваются кнопкой «Больше фильтров»
- **React Query Devtools** в режиме разработки

---
