# Install latest rust image (debian)
FROM rust:latest

# Create app directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Install app dependencies
RUN cargo build

# Map port to docker daemon
EXPOSE 3000

# Command to run
CMD [ "cargo", "run"]

