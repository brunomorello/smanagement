class ServiceNowAPI {

    constructor() {

        let restify = require('restify-clients');

        this._client = restify.createJSONClient({
            "url": "https://dev62106.service-now.com/"
        });

        this._client.basicAuth('admin', 'Teste123');

    }

    get(uri, callback) {

        this._client.get(uri, callback);

    }

}

module.exports = new ServiceNowAPI;