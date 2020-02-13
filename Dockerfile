FROM node:latest
USER root

RUN apt update && apt install socat -y

WORKDIR /workspace
