1. Requirements
 - docker
 - docker-compose
2. Run service locally
 - run on unix: sh build/scripts/run_all_dev.sh
 - run on windows: sh build/scripts/run_all_dev_windows.sh
3. Run tests e2e
 - run: docker-compose -f ./build/docker/docker-compose.E3E.yml up --build --abort-on-container-exit