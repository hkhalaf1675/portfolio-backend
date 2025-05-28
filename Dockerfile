FROM node:20-alpine

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=6001

EXPOSE  6001

RUN npm run build

CMD ["pm2-runtime", "dist/main.js"]