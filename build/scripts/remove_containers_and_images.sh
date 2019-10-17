sudo docker stop $(sudo docker container ls -a -q --filter ancestor="wordki")
sudo docker rm $(sudo docker container ls -a -q --filter ancestor="wordki")
sudo docker rm $(sudo docker container ls -a -q --filter ancestor="wordki.builder")
sudo docker image rm wordki
sudo docker image rm wordki.builder