const Cloudant = require('@cloudant/cloudant');

exports.createDBConnection = () => {

    // get Env vars
    const {
        CLOUDANT_URL,
        CLOUDANT_IAMKEY,
        CLOUDANT_DB_INSTANCE
    } = process.env;


    let cloudant = new Cloudant({
        url: CLOUDANT_URL,
        plugins: {
            iamauth: {
                iamApiKey: CLOUDANT_IAMKEY
            }
        }
    });

   return cloudant.db.use(CLOUDANT_DB_INSTANCE);

};