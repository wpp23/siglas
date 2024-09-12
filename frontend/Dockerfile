FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm config set strict-ssl=false
RUN npm install 

RUN npm run build

EXPOSE 3000

CMD ["npm", "run" , "dev"]
