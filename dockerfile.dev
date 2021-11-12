FROM node:16.13-alpine3.12
ENV NUXT_HOST=0.0.0.0
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
RUN yarn build:prod
CMD yarn start:prod