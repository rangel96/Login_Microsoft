FROM node:18.12.1-buster-slim


RUN apt update && apt -y upgrade \
    && npm install -g npm@8.19.2 && npm install -g @angular/cli@15.0.1 \
    && apt install -y vim && apt list --upgradable

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
     && apt-get -y install --no-install-recommends xorg openbox libnss3 libasound2 libatk-adaptor libgtk-3-0

RUN mkdir /app

COPY src /app

WORKDIR /app

ENTRYPOINT [ "/app/entrypoint.sh" ]
