
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --build-from-source


COPY . .

ENV NODE_ENV production
ENV PORT 5000

CMD ["node", "server.js"]