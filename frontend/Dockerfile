# Use Node 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm clean-install
RUN npm install express

# Copy the rest of the app and build it
COPY . /app
RUN npm run build

# Copy the server script
COPY server.js /app/server.js

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]