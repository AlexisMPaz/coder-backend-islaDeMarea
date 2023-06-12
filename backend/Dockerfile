FROM node:18.16.0

WORKDIR /clase-36

COPY src ./src
COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["node", "src/index.js"]