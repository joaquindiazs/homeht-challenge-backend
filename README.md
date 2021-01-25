# Nodejs express API

This project is a [challenge](https://www.notion.so/Backend-Challenge-vo2-2020-806b0b15b2944f0aada8b4a86849f7ee) for HomeHt 

## Prerequisites

- Node 10.16.0 or later version on your local development machine
- Have MySQL or MariaDB with a `homeht` database created - (Easy setup with docker below)

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm start:dev`

Runs the app in the development mode where automatically restarts the node application when file changes in the directory are detected.

## Run a mysql container

Dockerizing the database: 8.0.23 MySQL Community Server

  ```
  sudo docker run -h 127.0.0.1 -p 3306:3306 --name node-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
  sudo docker start node-mysql
  sudo docker exec -it node-mysql mysql -u root -p
    create database homeht;
    ALTER USER root IDENTIFIED WITH mysql_native_password BY 'root';
    flush privileges;
  sudo docker restart node-mysql
 
  ```
  
  ## Curl
  
  ```
  curl -X GET "http://localhost:3000/item?contractId=1&startDate=2021-01-06&endDate=2021-01-30"
  curl -d '{"contractId":1, "description":"Pay may", "value": 100, "isImported": true, "time":"2021-01-25","isDeleted":false}' -H "Content-Type: application/json" -X POST http://localhost:3000/item
  curl -d '{"contractId":1, "description":"Pay Jul", "value": 500, "isImported": true, "time":"2021-01-25","isDeleted":false}' -H "Content-Type: application/json" -X PUT "http://localhost:3000/item?id=1"
  curl -X DELETE "http://localhost:3000/item?id=1"
  
  ```
  
  ## [Short summary of technical choices, the decisions I made and what could be improved.](https://gist.github.com/joaquindiazs/a9e70534037b93eb4ca5d8e78daf09b0)
