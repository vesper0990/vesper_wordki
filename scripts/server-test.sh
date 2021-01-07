#!/bin/sh

export BUILD_BUILDID="local"

docker-compose -f ../server/build/docker/docker-compose.E2E.yml up --build
