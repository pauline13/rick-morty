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
- **Axios** — HTTP-клиент
- **react-hot-toast** — toast-уведомления об ошибках
- **Sass (SCSS)** — стили
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
├── widgets/     # самостоятельные UI-блоки (Header, Footer, CharacterCard, FiltersPanel)
├── entities/    # бизнес-сущности (character: api, model, hooks)
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

## ✨ Функционал

- Список персонажей с загрузкой данных из API
- Фильтрация по **имени**, **статусу**, **виду** и **полу**
- Debounce поискового запроса по имени
- Бесконечная прокрутка списка через `IntersectionObserver`
- Автоматический retry запроса при сетевых, серверных и rate-limit ошибках
- Переход на детальную страницу персонажа
- Визуальное редактирование данных персонажа прямо в карточке (без сохранения в API)
- Обработка ошибок через toast-уведомления (`react-hot-toast`)
- `ErrorBoundary` на верхнем уровне с возможностью перезагрузить страницу
- Страница 404 для несуществующих роутов
- Отмена устаревших запросов через `AbortController`
