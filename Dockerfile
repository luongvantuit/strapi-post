FROM node:16.15.1

WORKDIR /usr/app/strapi

COPY . .

RUN yarn install

EXPOSE 1337

CMD [ "yarn","start" ]