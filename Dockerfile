FROM node:18.15.0-alpine
WORKDIR /app
ADD package*.json ./
ADD yarn.lock ./
RUN yarn install
ADD . .
CMD ["sh", "-c", "yarn build && yarn start"]
