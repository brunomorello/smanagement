const winston = require('winston');
const fs = require('fs');

// if(!fs.existsSync('../logs')) {
//     fs.mkdirSync('../logs');
// }

module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5000,
            maxFiles: 10
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5000,
            maxFiles: 10
        })
    ]
});