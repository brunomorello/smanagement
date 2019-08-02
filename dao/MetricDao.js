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

    selectAll(callback) {
        this._connection.query('SELECT * FROM metric', callback);
    }

    get(id, callback) {
        this._connection.query('SELECT * FROM metric WHERE id = ?', id, callback);
    }

}

module.exports = new MetricDao;