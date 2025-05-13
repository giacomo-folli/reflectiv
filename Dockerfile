# Stage 1: Dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache utilization
# Use --frozen-lockfile or --immutable for a more deterministic install
RUN npm ci --silent

# Stage 2: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the SvelteKit application
# Add build arguments if needed for environment-specific builds
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production dependencies to reduce image size
RUN apk add --no-cache sqlite tini

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit

# Create directories for data persistence with proper permissions
RUN mkdir -p /app/data && \
    chown -R sveltekit:nodejs /app/data && \
    chmod 755 /app/data

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/package.json ./
COPY --from=builder --chown=sveltekit:nodejs /app/.env.example ./.env.example

# Install only production dependencies for the final image
RUN npm ci --silent --production && \
    npm cache clean --force

# Switch to non-root user
USER sveltekit

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0
ENV DATA_DIR=/app/data

# Expose the port the app will run on
EXPOSE 5000

# Use tini as init system to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Command to run the application
CMD ["node", "build/index.js"]