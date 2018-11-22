docker volume create --name appbuild
docker volume create --name dbvol
docker-compose -f ../docker/docker-compose.yml up -d
