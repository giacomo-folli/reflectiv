ARG NODE_IMAGE=node:22.11.0-alpine

FROM $NODE_IMAGE AS base
RUN apk update
RUN apk add --no-cache sqlite
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN chmod +x docker-entrypoint.sh

# ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 DATA_DIR=/home/node/app/data
# EXPOSE 3000

ENTRYPOINT [ "/home/node/app/docker-entrypoint.sh" ]
CMD ["node", "/home/node/app/build"]