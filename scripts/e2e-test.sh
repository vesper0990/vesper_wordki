#!/bin/sh

export BUILD_BUILDID="local"

docker-compose -f ../client/build/docker/docker-compose.e2e.yml up --build --abort-on-container-exit
