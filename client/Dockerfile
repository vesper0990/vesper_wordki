FROM node as build-stage

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build:docker
RUN npm run test:docker

FROM nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/coverage /usr/share/nginx/html/coverage
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf