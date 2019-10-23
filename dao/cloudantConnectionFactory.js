const Cloudant = require('@cloudant/cloudant');

exports.createDBConnection = () => {

    // get Env vars
    const {
        CLOUDANT_URL,
        CLOUDANT_IAMKEY,
        CLOUDANT_DB_INSTANCE
    } = process.env;


    let cloudant = new Cloudant({
        url: 'https://05cfc43d-1c86-4ae5-bbf9-a9ffb079f4ae-bluemix.cloudantnosqldb.appdomain.cloud',
        plugins: {
            iamauth: {
                iamApiKey: 'iG-1m5wiHQfQz-OAp91bOFCzmiDJ3v2bt9g1MMtWkI6O'
            }
        }
    });

    return cloudant.db.use('smanagement-api');

};