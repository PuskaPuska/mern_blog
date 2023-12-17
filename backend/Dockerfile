# Выбор базового образа
FROM node:18-alpine

# Установка рабочей директории в контейнере
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов проекта в контейнер
COPY . .

# Открытие порта 4444 для доступа к серверу
EXPOSE 4444

# Команда для запуска сервера
CMD ["node", "index.js"]

