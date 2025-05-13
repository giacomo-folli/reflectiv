ARG NODE_IMAGE=node:22.11.0-alpine

FROM $NODE_IMAGE AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

RUN apk update \
    apk add --no-cache sqlite tini

ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 DATA_DIR=/app/data

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "build/index.js"]