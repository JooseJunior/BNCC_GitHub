FROM node:alpine

ENV PORT=4000

WORKDIR /app-node

COPY . .

RUN npm install

ENTRYPOINT ["node","server.js"]

