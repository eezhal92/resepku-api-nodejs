FROM node:6.9

MAINTAINER muhammad rizki rijal <arkinthesky.69@gmail.com>

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install -g yarn

RUN yarn install

COPY . /src/app

EXPOSE 3000

CMD [ "npm", "start" ]
