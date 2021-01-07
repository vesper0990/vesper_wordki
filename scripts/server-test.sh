#!/bin/sh

export BUILD_BUILDID="local"

docker-compose -f ../server/build/docker/docker-compose.test.yml up --build
