# Доска задач с CI/CD

Дипломный проект на тему "Магазин 3д-моделей".

## Возможности
- Авторизация пользователей c использованием сессий
- Создание, редактирование и удаление моделей
- Предпросмотр моделей в браузере перед покупкой и при добавлении
- Поиск по товарам в реальном времени 
- Индивидуальные страницы моделей
- Страница оплаты

## Использованные технологии
Next.js, Three.js, Zustand, Gsap, Axios, Lodash, Express, Postgres

## Установка
Перед запуском проекта потребуется создать базу данных Postgres с помощью схемы project_scheme.sql
```bash
git clone https://github.com/eumara31/polyform
cd polyform
cd server
npm install
npm run dev
cd ..
cd polyform
cd client
npm install
npm run dev