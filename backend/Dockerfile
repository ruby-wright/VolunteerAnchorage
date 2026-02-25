# Use official Node.js 18 image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose port 5000 (matches your backend service)
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
