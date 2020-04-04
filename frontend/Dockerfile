FROM node:13-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY frontend-app/package.json frontend-app/package-lock.json /app/frontend-app/

RUN npm install --prefix frontend-app

COPY . /app

RUN npm run build --prefix frontend-app -- --output-path=./dist/out

FROM nginx:1.15.7-alpine

RUN rm -rf /usr/share/nignx/html/*

COPY --from=builder /app/frontend-app/dist/out /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf