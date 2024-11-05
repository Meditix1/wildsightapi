FROM node:17

WORKDIR /usr/src/app

# Copy package.json files
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

USER 1000

CMD ["node", "index.js"]