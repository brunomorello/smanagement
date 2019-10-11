let mysql = require('mysql');

exports.createDBConnection = () => {

    const {
        DATABASE_USERNAME,
        DATABASE_PWD,
        DATABASE_HOSTNAME,
        DATABASE_PORT,
        DATABASE_DB
    } = process.env;

    return mysql.createConnection({
        host: DATABASE_HOSTNAME,
        port: DATABASE_PORT,
        user: DATABASE_USERNAME,
        password: DATABASE_PWD,
        database: DATABASE_DB
    });

}