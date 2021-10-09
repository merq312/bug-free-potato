# Current LTS node version
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# copy both package and package.lock
COPY package*.json ./

RUN npm install
# For production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Map port to docker daemon
EXPOSE 3000

# Command to run
CMD [ "npm", "start"]

