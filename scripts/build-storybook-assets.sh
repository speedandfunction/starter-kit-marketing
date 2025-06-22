#!/bin/bash

# Build ApostropheCMS assets
echo "Building ApostropheCMS assets..."
node app @apostrophecms/asset:build || exit 1

# Create Storybook assets directory if it doesn't exist
mkdir -p .storybook/assets

# Copy the built assets to Storybook
echo "Copying assets to Storybook..."
cp -r public/apos-frontend/default/* .storybook/assets/

echo "Assets prepared for Storybook!"
