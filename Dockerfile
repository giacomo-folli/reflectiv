ARG NODE_IMAGE=node:22.11.0-alpine
ARG ADAPTER=node

# Base image with SQLite and non-root setup
FROM $NODE_IMAGE AS base
RUN apk update && apk add --no-cache sqlite
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node

# Build stage
FROM base AS build
COPY --chown=node:node package*.json ./
RUN npm ci --silent
COPY --chown=node:node . .

RUN ADAPTER=$ADAPTER npm run build

# Final stage
FROM base AS final
COPY --from=build /home/node/app /home/node/app

CMD ["node", "build/index.js"]