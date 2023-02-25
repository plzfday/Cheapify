# create react dockerfile
FROM node:18-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .

RUN npm ci

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]