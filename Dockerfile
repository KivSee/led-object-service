# syntax=docker/dockerfile:1

FROM node:14.17.5-alpine as build1

ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . .
RUN yarn build
RUN ls /app

FROM node:14.17.5-alpine
WORKDIR /app
COPY --from=build1 /app/node_modules ./node_modules
COPY --from=build1 /app/dist ./dist
COPY --from=build1 /app/package.json ./package.json
CMD [ "yarn", "start:prod" ]
