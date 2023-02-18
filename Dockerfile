# Base Image (linux based image with nodejs installed)
FROM node:lts

RUN mkdir -p /app
WORKDIR /app

# Copy from to
COPY . ./

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]