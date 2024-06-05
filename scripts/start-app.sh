#!/bin/bash

set -e

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi


# Check if Node version is at least 20
NODE_VERSION=$(node -v | cut -d. -f1 | sed 's/[^0-9]*//g')

if [ "$NODE_VERSION" -lt 20 ]; then
  echo "Node.js version 20 or greater is required to run this application."
  exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
  echo "bun is not installed. Installing bun..."
  curl -fsSL https://bun.sh/install | bash
fi

# Check if bun version is at least 1
BUN_VERSION=$(bun -v | cut -d. -f1 | sed 's/[^0-9]*//g')

if [ "$BUN_VERSION" -lt 1 ]; then
  echo "bun version 1 or greater is required to run this application. Updating bun..."
  bun upgrade
fi

# Check if another package manager is being used
LOCKFILES=$(find . -type f -name "yarn.lock" -o -name "package-lock.json" -o -name "pnpm-lock.yaml")

if [ -n "$LOCKFILES" ]; then
  echo "Another package manager is being used. Cleaning up lock files..."
  rm -rf $LOCKFILES node_modules
fi

# Create the .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
fi

# Install dependencies
bun install --frozen-lockfile

# Generate the Prisma client
bun run db:generate

# Ask the user if they want to start the application in development mode or production mode
echo "Do you want to start the application in development mode or production mode? (default: development)"
read -p "Enter 'dev or 'prod': " MODE

if [ "$MODE" == "prod" ]; then
  echo "Starting the application in production mode..."
  bun --bun run build
  bun --bun run start
else
  echo "Starting the application in development mode..."
  bun --bun run dev
fi