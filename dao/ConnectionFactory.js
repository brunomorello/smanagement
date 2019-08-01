let mysql = require('mysql');

export class ConnectionFactory {

    get connection() {
        return mysql.createConnection({
            host: '0.0.0.0',
            user: 'root',
            password: 'dqm50vnc',
            database: 'smanagement'
        });
    }

}