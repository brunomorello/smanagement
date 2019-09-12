class MetricDao {
 
    constructor() {        

        let mysqlConnection = require('./connectionFactory');

        this._connection = mysqlConnection.createDBConnection();
        
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