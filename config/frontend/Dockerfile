# Use an official node runtime as a parent image
FROM node:13

# Install curl, node, & yarn
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash \
  && apt-get install nodejs \
  && curl -o- -L https://yarnpkg.com/install.sh | bash

# Copiamos el entrypoint
COPY ./config/frontend/entrypoint.sh .

COPY ./front /app
WORKDIR /app/

RUN yarn install


