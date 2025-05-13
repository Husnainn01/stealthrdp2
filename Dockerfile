FROM node:20-slim

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy the server package files
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV PORT=5001
ENV NODE_ENV=production

# Start the server
CMD ["sh", "-c", "cd server && node server.js || node index.js"] 