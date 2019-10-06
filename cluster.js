let cluster = require('cluster');
let os = require('os');

let cpus = os.cpus();

if(cluster.isMaster) {

    cpus.forEach(() => {
        cluster.fork();
    });

    cluster.on('listening', worker => {
        console.log(`cluster using PID ${worker.process.pid}`);
    });

    // if any node is down start it again
    cluster.on('exit', worker => {
        console.log(`clusted ${worker.process.pid} disconnected`);
        cluster.fork();        
    })

} else {
    require('./index.js');
}