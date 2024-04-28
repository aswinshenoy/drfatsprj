FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
