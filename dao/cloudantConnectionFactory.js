const Cloudant = require('@cloudant/cloudant');

let cloudant = new Cloudant({
    url: 'https://05cfc43d-1c86-4ae5-bbf9-a9ffb079f4ae-bluemix.cloudantnosqldb.appdomain.cloud',
    plugins: {
        iamauth: {
            iamApiKey: 'iG-1m5wiHQfQz-OAp91bOFCzmiDJ3v2bt9g1MMtWkI6O'
        }
    }
});

let db = cloudant.db.use('smanagement-api');

let fakeMetric = {
    "_id": "metric:ee399169-1202-4382-b9a2-2563e1d06a86",
    "name": "test",
    "target": "90"
};

db.insert(fakeMetric, (err, data) => {

    console.log(`Error ${err}`);
    console.log(`Data ${JSON.stringify(data)}`);

});

db.get(fakeMetric._id, (err, data) => {

    console.log(`Error ${err}`);
    console.log(`Data ${JSON.stringify(data)}`);    

    fakeMetric = data;

});

fakeMetric.name = "test 2";

db.insert(fakeMetric, (err,data) => {
    console.log(`Error ${err}`);
    console.log(`Data ${JSON.stringify(data)}`);    

})

db.get(fakeMetric._id, (err, data) => {
    console.log(`Error ${err}`);
    console.log(`Data ${JSON.stringify(data)}`);    
});