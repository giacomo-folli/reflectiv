USERNAME = giacomofolli
IMAGE_NAME = reflectiv
CONTAINER_NAME = reflectiv-container
PORT = 3000
TAG ?= latest

.PHONY: build run stop logs clean test

build:
	docker build -t $(IMAGE_NAME):$(TAG) .

build-prod:
	docker build -t ${USERNAME}/$(IMAGE_NAME):$(TAG) .

run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):$(PORT) --env-file .env $(IMAGE_NAME):latest

stop:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

clean:
	docker system prune -f

# test:
# 	docker exec $(CONTAINER_NAME) pytest
