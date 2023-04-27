FROM node:14-alpine

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8081

CMD [ "yarn", "start:dev" ]
