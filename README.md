# Service Management 

A Node REST API using microservices

#### Commands

npm install --save express
npm install -g nodemon
npm install --save consign
npm install --save body-parser
npm install --save mysql
npm install --save express-validator
npm install --save uuid

nodemon index.js

##### Docker

Pull MySQL Image
```bash
docker pull mariadb/server:10.3
```

Create a MySQL Container with some default values
```bash
docker run --name localhostlab -e MYSQL_ROOT_PASSWORD=dqm50vnc -p 3306:3306 -d mariadb/server:10.3
```

Basic Commands
```bash
docker restart localhostlab
docker stop localhostlab
docker start localhostlab
docker logs localhostlab
```

Gets Docker Port to connect
```bash
docker port localhostlab
```

Open Bash for this container
```bash
docker exec -it localhostlab bash
```

Find the IP address that has been assigned to the container
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' localhostlab
```

Install amqplib lib for RabbitMQ
```
npm install --save amqplib
```

Install REST lib to consume REST APIs
```
npm install --save restify
npm install --save restify-clients 
```
// TODO use RabbitMQ as container

Install SOAP lib to consume Web Services SOAP
```
npm install --save soap
```