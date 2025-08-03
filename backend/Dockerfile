FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Build TypeScript → JavaScript
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start app
CMD ["npm", "run", "dev"]
