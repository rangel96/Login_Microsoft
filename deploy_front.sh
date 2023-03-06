#!/bin/bash
# ! Este archivo solo funciona en MacOs y distribuciones de Linux !

# Si existe BUILD te crea el contenedor
BUILD=${1:-false}
END=${1:-false}
LOGS=${1:-false}

# Variables
IMAGE_NAME=login_microsoft
CONTAINER_NAME=login_microsoft
IMAGE_TAG=v1
PORT=4200

# Si existe END terminar el proceso
END=${1:-false}
if [ "$END" == "end" ]; then
  echo "End docker image..."
  docker rm -f "$IMAGE_NAME"
  exit 0
fi

# Si existe LOGS imprimir los logs en pantalla
if [ "$LOGS" == "logs" ]; then
  echo "Open logs..."
  docker logs -f "$IMAGE_NAME"
  exit 0
fi

# Abre la terminal del contenedor
if [ "$LOGS" == "term" ]; then
  echo "Open term..."
  docker exec -it "$IMAGE_NAME" bash
  exit 0
fi

# Si existe BUILD construir la imagen
if [ "$BUILD" == "build" ]; then
  echo "Building ${IMAGE_NAME}..."
  docker build -t "$IMAGE_NAME":"$IMAGE_TAG" .
fi

# Down container image
echo "Down container ${CONTAINER_NAME} image..."
docker rm -f "$CONTAINER_NAME"

# Comando para iniciar el Angular
# -d or -it para hacer switch entre mostrarlo en el Command
echo "Up container ${IMAGE_NAME} image..."
docker run --name "$CONTAINER_NAME" -p $PORT:$PORT -v "$(pwd):/app" -d -it "$IMAGE_NAME":"$IMAGE_TAG"

# Comando para ver los logs del contenedor
docker logs -f "$CONTAINER_NAME"
