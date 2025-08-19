# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port (optional, for future network features)
EXPOSE 3000

# Default command: run the PLC mock server
CMD ["npx", "ts-node", "src/server.ts"]