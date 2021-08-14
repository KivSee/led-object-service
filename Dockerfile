# syntax=docker/dockerfile:1

FROM node:14.17.5-alpine as build
WORKDIR /build
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

FROM node:14.17.5-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY --from=build /build/dist ./dist
CMD [ "yarn", "start:prod" ]
