# Service Management 

A Node REST API using microservices

## Package Install Commands

```npm install --save express```

```npm install -g nodemon```

```npm install --save consign```

```npm install --save body-parser```

```npm install --save mysql```

```npm install --save express-validator```

```npm install --save uuid```

```nodemon index.js```

## Docker

### Pull MySQL Image

```docker pull mariadb/server:10.3```

### Create a MySQL Container with some default values

```docker run --name localhostlab -e MYSQL_ROOT_PASSWORD=dqm50vnc -p 3306:3306 -d mariadb/server:10.3```

*PS: don't forge to share the document files with Docker user to avoid issues when use /docker-entrypoint-initdb.d/ to import sql dumps*

### Basic Commands

```docker restart localhostlab```

```docker stop localhostlab```

```docker start localhostlab```

```docker logs localhostlab```

### Gets Docker Port to connect

```docker port localhostlab```

### Open Bash for this container

```docker exec -it localhostlab bash```

### Find the IP address that has been assigned to the container

```docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' localhostlab```

### Create rabbitmq container

```docker run -d --hostname localhost --name localhost-mq -p 5672:5672 -d rabbitmq:3-alpine```

### Install amqplib lib for RabbitMQ

```npm install --save amqplib```

### Install REST lib to consume REST APIs

```npm install --save restify```

```npm install --save restify-clients```

### Install SOAP lib to consume Web Services SOAP

```npm install --save soap```

### POST Files using curl

```curl -X POST http://localhost:3000/upload --data-binary @file.jpg -H "Content-type: application/octet-stream"```

### Create memcached docker container

```docker run --name localhost-memcache -p 11211:11211 -d memcached:1.5.17-alpine memcached -m 64```

### Install memcached lib client

```npm install --save memcached```

### Install winston logs

```npm i --save winston```

### Install morgan logger middleware

```npm i --save morgan```

### Install IBM Cloudant Database

```npm i --save @cloudant/cloudant```

### Build Process using docker-compose

```docker-compose build```

```docker-compose up -d```

*To get logs* ```docker-compose logs```

*To stop containers* ```docker-compose down```

### Considerations:

- Use Dockerfile to prepare the build e.g. node and mysql
- Use docker-compose to complement settings for each image
- Run docker-compose build to guarantee changes were 'compiled'