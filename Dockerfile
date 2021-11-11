# Current LTS node version
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package and package.lock
COPY package*.json ./
# Install server dependencies
RUN npm install

# Copy client package and package.lock
COPY client/package*.json ./client/
# Install client dependencies
RUN cd client && npm install && cd ..

# Bundle app source
COPY . .

# Build client
RUN npm run build

# Map port to docker daemon
EXPOSE 3000

# Command to run
CMD [ "npm", "start"]
