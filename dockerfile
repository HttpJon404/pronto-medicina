FROM node:21-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only-production

COPY . .

RUN npm run build

FROM node:21-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]