let express = require('express');
let consign = require('consign');

module.exports = function () {
    let app = express();

    consign()
        .include('routes')
        .into(app);

    return app;
}