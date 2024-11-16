# Stage 1: Build the application
FROM node:18 AS builder

# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code and build it
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:18

WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper permissions
RUN mkdir .next
RUN chown -R node:node .next

USER node

EXPOSE 3000
ENV PORT=3000

# Run the application
CMD HOSTNAME="0.0.0.0" node server.js
