sudo docker volume create --name appbuild
sudo docker volume create --name dbvol
sudo docker-compose -f ../docker/docker-compose.yml up -d