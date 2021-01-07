#!/bin/sh

export BUILD_BUILDID="local"

docker-compose -f ../client/build/docker/docker-compose.test.yml up --build
