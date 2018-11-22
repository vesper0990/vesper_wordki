docker stop $(docker container ls -a -q --filter ancestor="<wordki>")
docker rm $(docker container ls -a -q --filter ancestor="<wordki>")
docker rm $(docker container ls -a -q --filter ancestor="<wordki.builder>")