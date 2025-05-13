# Stage 1: Build the application
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Install SQLite dependencies
RUN apk add --no-cache sqlite

# Create directories for data persistence
RUN mkdir -p /app/data && \
    chmod 777 /app/data

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit

# Copy built application from the builder stage
COPY --from=builder --chown=sveltekit:nodejs /app/build /app/build
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=sveltekit:nodejs /app/package.json /app/package.json

# Copy environment variable example file
COPY --from=builder --chown=sveltekit:nodejs /app/.env.example /app/.env.example

# Give ownership of the data directory to the application user
RUN chown -R sveltekit:nodejs /app/data

# Switch to non-root user
USER sveltekit

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0
ENV DATA_DIR=/app/data

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application
CMD ["node", "build/index.js"]