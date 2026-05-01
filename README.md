# Rick and Morty

Одностраничное React-приложение для просмотра персонажей вселенной _Rick and Morty_.  
Данные загружаются из публичного API и отображаются в виде списка с фильтрацией и переходом на детальную страницу персонажа.

## Деплой

Vercel: https://rick-morty-liart-six.vercel.app/

## Стек

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Sass
- ESLint
- Stylelint

## Установка

```
npm install         # установка зависимостей
```

## Скрипты

```
npm run dev        # запуск dev-сервера (Vite)
npm run build      # typecheck + сборка production-версии
npm run preview    # локальный предпросмотр production-сборки

npm run lint       # проверка ESLint
npm run lint:fix   # автофиксы ESLint

npm run lint:styles      # проверка stylelint (scss/css)
npm run lint:styles:fix  # автофиксы stylelint

npm run prettier   # форматирование проекта через Prettier
```

## Функционал

- список персонажей с загрузкой данных через API
- фильтрация по имени, статусу, виду и полу
- бесконечная прокрутка списка персонажей
- переход на страницу персонажа
- детальная информация о персонаже
- визуальное редактирование данных персонажа (без сохранения в API)
- обработка ошибок через toast-уведомления
- 404 страница для несуществующих роутов
