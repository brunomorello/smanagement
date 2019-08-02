let mysql = require('mysql');

exports.createDBConnection = () => {

    return mysql.createConnection({
        host: '0.0.0.0',
        port: '32769',
        user: 'root',
        password: 'dqm50vnc',
        database: 'smanagement'
    });

}