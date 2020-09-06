from node:10

workdir /usr/src/app

copy package*.json

run npm install

copy . .

expose 8000

cmd ["npm", "start"]
