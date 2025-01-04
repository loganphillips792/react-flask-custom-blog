#!/bin/bash

# Variables
IMAGE_NAME="dockedupstream/digitaloceanpythondevelopment"
CONTAINER_NAME="my_app"
PORT=8080  # Change based on your app's configuration

# Pull the latest image
docker pull $IMAGE_NAME

# Stop and remove the current container if it exists
docker rm -f $CONTAINER_NAME || true

# Run the new container
docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
