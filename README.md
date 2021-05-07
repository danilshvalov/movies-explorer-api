# Техническая документация `Movies Explorer`

IP адрес сервера: `84.201.181.239`
URI: `https://api.ds.movies-explorer.nomoredomains.icu`

## Содержание
[](#директории)
### 1. [Быстрый старт](#быстрый-старт-в-backend)
### 2. [Модели](#модели)
- [Модель пользователя](#модель-пользователя-️)
- [Модель фильма](#модель-фильма-)
### 3. [Запросы к серверу](#запросы-к-серверу-)
### 4. [Коды ошибок](#коды-ошибок-) 
- [400 — Некорректные данные](#400-)
- [401 — Пользователь не авторизован](#401-)
- [403 — Недостаточно прав](#403-)
- [404 — Не найдено](#404-)
- [409 — Конфликт данных](#409-)
- [500 — Непредвиденная ошибка](#500-)

---

# Быстрый старт в `backend`

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Директории

`/controllers` - папка с контроллерами  
`/errors` - папка с видами ошибок  
`/middlewares` - папка с middlewares  
`/models` - папка с моделями БД  
`/routes` — папка с файлами роутера  
`/utils` - папка с вспомогательными функциями  
`/validators` - папка с валидаторами входных данных  


## Зависимости
|       Название       |  Версия   |
| :------------------: | :-------: |
|      `bcryptjs`      | `^2.4.3`  |
|     `celebrate`      | `^14.0.0` |
|   `cookie-parser`    | `^1.4.5`  |
|        `cors`        | `^2.8.5`  |
|       `dotenv`       | `^8.2.0`  |
|      `express`       | `^4.17.1` |
| `express-rate-limit` | `^5.2.6`  |
|  `express-winston`   | `^4.1.0`  |
|       `helmet`       | `^4.6.0`  |
|    `jsonwebtoken`    | `^8.5.1`  |
|      `mongoose`      | `^5.12.7` |
|     `validator`      | `^13.6.0` |
|      `winston`       | `^3.3.3`  |
  
## `DEV` зависимости
|          Название           |  Версия   |
| :-------------------------: | :-------: |
|          `eslint`           | `^7.25.0` |
| `eslint-config-airbnb-base` | `^14.2.1` |
|   `eslint-plugin-import`    | `^2.22.1` |
|          `nodemon`          | `^2.0.7`  |
|         `prettier`          | `^2.2.1`  |
---

# Модели
## Модель пользователя 🙋🏻‍♂️

|  Название  |     Тип поля      |            Ограничения             |     Описание     |
| :--------: | :---------------: | :--------------------------------: | :--------------: |
|   `name`   |     `String`      |      От `2` до `30` символов       | Имя пользователя |
|  `email`   | `Email as String` | E-mail формата `example@email.com` | E-mail для входа |
| `password` |     `String`      |       Не менее `8` символов        | Пароль для входа |


## Модель фильма 🎬
|   Название    |     Тип поля     |               Ограничения               |           Описание            |
| :-----------: | :--------------: | :-------------------------------------: | :---------------------------: |
|   `country`   |     `String`     |                    —                    |            Страна             |
|  `director`   |     `String`     |                    —                    |           Режиссёр            |
|  `duration`   |     `Number`     |                    —                    |         Длительность          |
|    `year`     |     `String`     |                    —                    |          Год выхода           |
| `description` |     `String`     |                    —                    |           Описание            |
|    `image`    | `Link as String` | Ссылки формата `http://` или `https://` |            Постер             |
|   `trailer`   | `Link as String` | Ссылки формата `http://` или `https://` |            Трейлер            |
|  `thumbnail`  | `Link as String` | Ссылки формата `http://` или `https://` |    Миниатюрное изображение    |
|    `owner`    |    `ObjectId`    |                    —                    | Создатель БД-записи о фильме  |
|   `nameRU`    |     `String`     |                    —                    |  Название  на русском языке   |
|   `nameEN`    |     `String`     |                    —                    | Название  на английском языке |


---

# Запросы к серверу 🛠
|        Путь        | Тип запроса |                  Ответ сервера                   |
| :----------------: | :---------: | :----------------------------------------------: |
|    `/users/me`     |    `GET`    |          Данные о текущего пользователя          |
|                    |   `PATCH`   | Изменение `name` и `email` текущего пользователя |
|     `/movies`      |    `GET`    |  Список всех сохранённых пользователем фильмов   |
|                    |   `POST`    |   Создание **`собственной`** записи с фильмом    |
| `/movies/:movieId` |  `DELETE`   |   Удаление **`собственной`** записи с фильмом    |
|     `/signup`      |   `POST`    |               Регистрация аккаунта               |
|     `/signin`      |   `POST`    |     Вход в аккаунт с помощью e-mail и пароля     |
|     `/signout`     |   `POST`    |                Выход из аккаунта                 |
  

---
  
# Коды ошибок ❌
## `400` 🕳
Ошибки с кодом `400` возникают из-за несоответствия входных данных с требованиями [модели](#модели)

|          Путь          | Тип запроса |                 Описание                 |
| :--------------------: | :---------: | :--------------------------------------: |
|      `/users/me`       |   `PATCH`   |   Некорректное поле `name` или `email`   |
|   `/movies/:movieId`   |  `DELETE`   |            Некорректный `ID`             |
| `/signup`<br>`/signin` |   `POST`    | Некорректное поле `email` или `password` |

## `401` 🔑
Ошибки с кодом `401` возникают из-за действий неавторизованного пользователя
|           Путь            | Тип запроса |                       Описание                       |
| :-----------------------: | :---------: | :--------------------------------------------------: |
| `/users/*`<br>`/movies/*` |     `*`     | Необходима авторизация для совершения любых действий |
|         `/signin`         |   `POST`    |  Неверный `email` или `password`<br>Неверный `JWT`   |

## `403` 🔐
Ошибки с кодом `403` возникают из-за нарушения прав доступа
|        Путь        | Тип запроса |                Описание                 |
| :----------------: | :---------: | :-------------------------------------: |
| `/movies/:movieId` |  `DELETE`   | Удаление **`не созданной вами`** записи |


## `404` 🔍
Ошибки с кодом `404` возникают из-за запроса несуществующих данных
|    Путь     | Тип запроса |              Описание               |
| :---------: | :---------: | :---------------------------------: |
| `/users/*`  |     `*`     | Пользователь с таким `ID` не найден |
| `/movies/*` |     `*`     |   Запись с таким `ID` не найдена    |

## `409` 🪤
Ошибки с кодом `409` возникают из-за конфликта данных
|    Путь     | Тип запроса |                  Описание                   |
| :---------: | :---------: | :-----------------------------------------: |
|  `/signup`  |   `POST`    | Пользователь с таким `email` уже существует |
| `/users/me` |   `PATCH`   | Пользователь с таким `email` уже существует |


## `500` 🎁
| Путь  | Тип запроса |                               Описание                                |
| :---: | :---------: | :-------------------------------------------------------------------: |
|  `*`  |     `*`     | На сервере произошла непредвиденная ошибка<br>Напишите мне об этом! 🗃 |