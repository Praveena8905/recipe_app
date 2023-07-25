# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port your Node.js app is listening on (replace 3000 with your app's port)
EXPOSE 3000

# Specify the command to start your Node.js app (replace "index.js" with your entry point)
CMD ["node", "server.js"]
