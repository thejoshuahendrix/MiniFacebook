FROM node:14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install

COPY public ./public
COPY src ./src

CMD [ "yarn", "start" ]