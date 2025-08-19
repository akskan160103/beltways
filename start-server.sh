#!/bin/bash
# Simple script to install dependencies and start the PLC mock server

echo "Installing dependencies..."
npm install

echo "Starting PLC Mock Server..."
npx ts-node src/server.ts

