#!/bin/bash

# Stop and remove old containers & volumes
echo "Stopping old containers and deleting volumes..."
docker compose down -v --remove-orphans

# Start fresh Postgres container
echo "Starting fresh Postgres container..."
docker compose up -d

# DB to initialize
echo "Waiting for Postgres to start..."
sleep 5

# Start Node server
echo "Starting backend server..."
cd backend
node server.js
