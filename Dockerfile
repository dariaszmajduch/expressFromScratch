FROM node:lts
WORKDIR ./
COPY package.json ./
RUN npm i
COPY . .
CMD ["node", "index.js"]
