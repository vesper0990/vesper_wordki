#!/bin/sh

export BUILD_BUILDID="local"

docker-compose -f ../server/build/docker/docker-compose.database.yml up -d

docker-compose -f ../server/build/docker/docker-compose.local.yml up --build
