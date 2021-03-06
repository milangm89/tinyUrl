FROM node:carbon

MAINTAINER Milan George <milangm89@gmail.com>

#RUN apt-get update && apt-get install mongodb -y 

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ] 
