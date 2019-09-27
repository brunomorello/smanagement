class Memcached {

    constructor () {

        let _memcached = require('memcached');
        this._client = new _memcached('localhost:11211', {
            retries: 10,
            retry: 10000,
            remove: true
        });

    }

    set(metricName, metric) {

        this._client.set(metricName, metric, 60000, (err) => {
            
            if(err) throw new Error(err);

            console.log(`new key added to cache: ${metricName}`);

        })

    }

    get(metricName, callback) {

        this._client.get(metricName, callback);

    }


}

module.exports = new Memcached;