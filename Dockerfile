FROM node:16-alpine
LABEL maintainer="yusufansari563@gmail.com"

ADD . /app
WORKDIR /app

EXPOSE "9090"

RUN npm install