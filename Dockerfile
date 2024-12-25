FROM --platform=linux/amd64 node:22-alpine as builder
RUN apk update && apk add --no-cache python3-dev make alpine-sdk gcc g++ git build-base openssh openssl bash 

WORKDIR /server/qp
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

ENTRYPOINT ["npm", "start"]