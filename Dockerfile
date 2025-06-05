# 1. For build React app
FROM node:16-alpine AS development


# Set working directory
WORKDIR /app

COPY package.json /app/
RUN npm install --force

COPY . /app

FROM development AS build
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/website

RUN rm -rf ./*
COPY --from=build /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
