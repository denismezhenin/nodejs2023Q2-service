FROM node:18.17-alpine
WORKDIR /usr/app
COPY package*.json
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev " ]  