
FROM node:21-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only-production

COPY . .

RUN npm run start:dev

