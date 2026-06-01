# Rick and Morty

Одностраничное React-приложение для просмотра персонажей вселенной _Rick and Morty_.  
Данные загружаются из публичного [Rick and Morty API](https://rickandmortyapi.com/) и отображаются в виде списка с фильтрацией, бесконечной прокруткой и переходом на детальную страницу персонажа.

---

## 🚀 Деплой

| Площадка         | Ссылка                                   |
| ---------------- | ---------------------------------------- |
| **Vercel**       | https://rick-morty-liart-six.vercel.app/ |
| **GitHub Pages** | https://pauline13.github.io/rick-morty/  |

---

## 🛠️ Стек

- **React 19** + **TypeScript**
- **Vite 7** — сборка и dev-сервер
- **React Router 7** — клиентская маршрутизация
- **TanStack React Query 5** — серверное состояние, кэш, пагинация и запросы к API
- **Zustand** — клиентское состояние (фильтры списка, тема оформления)
- **i18next** — интернационализация UI
- **Axios** — HTTP-клиент
- **react-hot-toast** — toast-уведомления об ошибках
- **Sass (SCSS)** — стили
- **Vitest** + **Testing Library** + **jsdom** — unit- и component-тесты
- **Playwright** — e2e-тесты в браузере
- **ESLint** + **Stylelint** + **Prettier** — линтинг и форматирование
- **vite-plugin-svgr** + **vite-plugin-image-optimizer** — оптимизация ассетов
- **vite-bundle-analyzer** — анализ бандла

---

## 🏗️ Архитектура

Проект организован по принципам **Feature-Sliced Design**:

```
src/
├── app/         # инициализация: точка входа, провайдеры, роутинг, layout
├── pages/       # страницы (CharactersPage, CharacterInfoPage, NotFoundPage)
├── widgets/     # UI-блоки (Header, Footer, FiltersPanel, LanguageSwitcher, ThemeSwitcher)
├── entities/    # бизнес-сущности (character: api, model, hooks)
├── stores/      # клиентское состояние: фильтры персонажей, тема
└── shared/      # переиспользуемое: api, components, hooks, helpers, constants, assets, types
```

---

## 📦 Установка

```bash
npm install         # установка зависимостей
```

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

---

## ✨ Функционал

- Список персонажей: загрузка и пагинация через **TanStack React Query** (`useInfiniteQuery`)
- Фильтрация по **имени**, **статусу**, **виду** и **полу**; состояние фильтров в **Zustand**
- Debounce поискового запроса по имени
- Бесконечная прокрутка: `IntersectionObserver` + `fetchNextPage` из React Query
- Retry запросов: глобальные настройки `QueryClient` и выборочный retry для детальной страницы (сетевые, серверные и rate-limit ошибки)
- Детальная страница персонажа через `useQuery`; при 404 — редирект на страницу «не найдено»
- Локальное редактирование карточки без сохранения в API — обновление кэша React Query (`setQueryData`)
- Обработка ошибок через toast-уведомления (`react-hot-toast`)
- `ErrorBoundary` на верхнем уровне с возможностью перезагрузить страницу
- Страница 404 для несуществующих роутов
- Отмена устаревших запросов: `AbortSignal` в `queryFn`, управляется React Query при смене параметров и размонтировании
- Локализация интерфейса (**i18next**): языки **en** и **ru**, выбор сохраняется между сессиями; при первом заходе — определение языка из настроек браузера. Переводится UI; данные с API (имена персонажей и т.п.) не локализуются
- Светлая и тёмная тема (**light** / **dark**): переключение сохраняется; при первом заходе — по системной настройке `prefers-color-scheme`
- **React Query Devtools** в режиме разработки

---
