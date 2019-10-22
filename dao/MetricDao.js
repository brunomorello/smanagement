class MetricDao {
 
    constructor() {

        // mysql decommisioned - comments remained only for studies purposes
        //let mysqlConnection = require('./connectionFactory');
        let cloudantFactory = require('./cloudantConnectionFactory');

        this._connection = cloudantFactory.createDBConnection();
        
        // this._connection.connect((err) => {
           
        //     if (err) throw err;

        //     console.log(`connected!`);            

        // });
    }

    insert(metric, callback) {
        //this._connection.query('INSERT INTO metric SET ?', metric, callback);
        this._connection.insert(metric, callback);
    }


    selectAll(tableName) {
        //this._connection.query('SELECT * FROM metric', callback);
        return this._connection.partitionedList(tableName, { include_docs: true });
    }
    
    get(id, callback) {
        //this._connection.query('SELECT * FROM metric WHERE id = ?', id, callback);
        this._connection.get(id, callback);
    }

    // update(metric, callback) {
    //     this._connection.query('UPDATE metric SET target = ? where id = ?', [metric.target, metric.id], callback);
    // }

    // inactive(metric, callback) {
    //     this._connection.query('UPDATE metric SET status = ? where id = ?', [metric.status, metric.id], callback);
    // }

}

module.exports = new MetricDao;