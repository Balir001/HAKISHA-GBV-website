FROM node:20.11.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3002
EXPOSE 3001

CMD ["npm", "start"]
