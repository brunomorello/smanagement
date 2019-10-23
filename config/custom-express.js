let express = require("express");
let consign = require("consign");
let bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    
    let app = express();

    //let accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/combined.log'), {flags: 'a' });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use(morgan('combined', { stream: accessLogStream }));

    consign()
        .include('routes')
        .into(app);

    return app;
}