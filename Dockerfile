FROM node:slim


RUN apt update
RUN apt install git -y

RUN mkdir /app
WORKDIR /app

