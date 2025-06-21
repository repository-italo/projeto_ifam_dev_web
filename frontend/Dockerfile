FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . /app/

# Expose the dev server port
EXPOSE 4200

# Start the Angular dev server
CMD ["npm", "run", "start"]
