let mysql = require('mysql');

exports.createDBConnection = () => {

    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'dqm50vnc',
        database: 'smanagement'
    });

}