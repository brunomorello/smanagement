class MetricDao {
 
    constructor() {

        let mysql = require('mysql');

        this._connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'dqm50vnc',
            database: 'smanagement'
        });
        
        this._connection.connect((err) => {
           
            if (err) throw err;

            console.log(`connected!`);            

        });
    }

    insert(metric, callback) {
        this._connection.query('INSERT INTO metric SET ?', metric, callback);
    }

    update(metric, callback) {
        this._connection.query('UPDATE metric SET target = ? where id = ?', [metric.target, metric.id], callback);
    }

    inactive(metric, callback) {
        this._connection.query('UPDATE metric SET status = ? where id = ?', [metric.status, metric.id], callback);
    }

    selectAll(callback) {
        this._connection.query('SELECT * FROM metric', callback);
    }

    get(id, callback) {
        this._connection.query('SELECT * FROM metric WHERE id = ?', id, callback);
    }

}

module.exports = new MetricDao;