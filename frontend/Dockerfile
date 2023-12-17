# Выбор базового образа
FROM node:18-alpine

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов package.json и yarn.lock
COPY package.json yarn.lock ./

# Установка зависимостей с помощью yarn
RUN yarn install

# Копирование всех файлов проекта в контейнер
COPY . .

# Сборка приложения
RUN yarn build

# Установка serve для запуска собранного приложения
RUN yarn global add serve

# Открытие порта 3000
EXPOSE 3000

# Запуск приложения
CMD ["serve", "-s", "build"]

