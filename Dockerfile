# build binary
FROM node:12.20.0-alpine3.12 AS build

RUN apk add --no-cache git make curl yarn

WORKDIR /app

COPY ./src ./src
COPY ./blog ./blog
COPY ./docs ./docs
COPY ./static ./static
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./docusaurus.config.js ./docusaurus.config.js
COPY ./sidebars.js ./sidebars.js
COPY ./babel.config.js ./babel.config.js

ARG VERSION=dev

RUN yarn
RUN yarn run build

# copy to alpine image
FROM nginx:1.19.6-alpine
RUN apk add --no-cache ca-certificates
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
