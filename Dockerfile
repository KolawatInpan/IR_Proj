# Stage 1: Build React app
FROM node:14 AS build

WORKDIR /app

# Copy the client code
COPY client/package.json client/package-lock.json ./
RUN npm install

COPY client/ ./
RUN npm run build

# Stage 2: Set up Flask server
FROM python:3.9-slim

WORKDIR /app

# Copy the server code
COPY server/requirements.txt ./
RUN pip install -r requirements.txt

COPY server/ ./

# Copy the built React app to the Flask static files directory
COPY --from=build /app/build /app/static

# Expose the port the app runs on
EXPOSE 5000

# Run the Flask server
CMD ["python", "app.py"]