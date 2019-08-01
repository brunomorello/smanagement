export class MetricDao {
 
    constructor(connection) {
        this._connection = connection;
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