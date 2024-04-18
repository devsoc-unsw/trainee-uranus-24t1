# Use an official Node runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Copy the custom prestart script
COPY add-js-extension.sh .
RUN chmod +x add-js-extension.sh

# Build your TypeScript app
RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8008

# Define the command to run your app using CMD which defines your runtime
CMD node src/index.js