# syntax=docker/dockerfile:1

FROM node:14.17.5-alpine as build

ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . .
CMD [ "yarn", "build" ]

FROM node:14.17.5-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
CMD [ "yarn", "start:prod" ]
