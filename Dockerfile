FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run
CMD ["npm", "start"]

