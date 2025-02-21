# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on (change 5000 if needed)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
