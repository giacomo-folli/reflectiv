# Makefile for Docker tasks

USERNAME = giacomofolli
IMAGE_NAME = reflectiv
CONTAINER_NAME = reflectiv-container
PORT = 5000

.PHONY: build run stop logs clean test

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):latest .

build-prod:
	docker build -t ${USERNAME}/$(IMAGE_NAME):latest .

# Run the Docker container
run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):$(PORT) --env-file .env $(IMAGE_NAME):latest

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

# View logs from the container
logs:
	docker logs -f $(CONTAINER_NAME)

# Clean up Docker images and containers
clean:
	docker system prune -f

# Run tests inside the container
test:
	docker exec $(CONTAINER_NAME) pytest
