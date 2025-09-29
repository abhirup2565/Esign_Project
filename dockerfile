FROM node:24.6.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the dev server port
EXPOSE 5173

# Run React dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
