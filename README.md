# Service Management 

A Node REST API using microservices

#### Commands

npm install --save express
npm install -g nodemon
npm install --save consign
npm install --save body-parser
npm install --save mysql

nodemon index.js

##### Docker

Pull MySQL Image
```docker pull mariadb/server:10.3```

Create a MySQL Container with some default values
```docker run --name localhostlab -e MYSQL_ROOT_PASSWORD=dqm50vnc -p 3306 -d mariadb/server:10.3```

Basic Commands
```docker restart localhostlab```
```docker stop localhostlab```
```docker start localhostlab```
```docker logs localhostlab```

Gets Docker Port to connect
```docker port localhostlab```

Open Bash for this container
```docker exec -it localhostlab bash```

Find the IP address that has been assigned to the container
```docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' localhostlab```