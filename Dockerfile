FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["node", "src/server.js"]
