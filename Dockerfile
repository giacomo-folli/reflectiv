ARG NODE_IMAGE=node:22.11.0-alpine
ARG ADAPTER=node

# Base image with SQLite and non-root setup
FROM $NODE_IMAGE AS base
RUN apk update && apk add --no-cache sqlite curl chromium
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
RUN mkdir -p /home/node/data && chown -R node:node /home/node/data
WORKDIR /home/node/app
USER node

# Build stage
FROM base AS build
COPY --chown=node:node package*.json ./
RUN npm ci --silent
COPY --chown=node:node svelte.config.js vite.config.js tsconfig.json postcss.config.js tailwind.config.js ./
COPY --chown=node:node src/ ./src/
COPY --chown=node:node static/ ./static/

RUN ADAPTER=$ADAPTER npm run build

# Final stage
FROM base AS final
WORKDIR /home/node/app

# Copy package files and install production dependencies
COPY --from=build --chown=node:node /home/node/app/package.json ./package.json
COPY --from=build --chown=node:node /home/node/app/package-lock.json ./package-lock.json
RUN npm ci --omit=dev --silent

# Copy the built application from the build stage
COPY --from=build --chown=node:node /home/node/app/build ./build

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "build/index.js"]