#!/bin/bash

# Variables
IMAGE_NAME="dockedupstream/digitaloceanpythondevelopment"
IMAGE_TAG="latest"
CONTAINER_NAME="my_app"
PORT=8080  # Change based on your app's configuration

# Pull the latest image
docker pull $IMAGE_NAME:$IMAGE_TAG

# Check if the container exists
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker rm -f $CONTAINER_NAME
else
    echo "No existing container named $CONTAINER_NAME. Proceeding to run the new container."
fi

# Run the new container
docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
