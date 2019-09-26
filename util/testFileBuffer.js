// usage:  node fileReader.js file_name

let fs = require('fs');

let fileName = process.argv[2];
let file = process.argv[3];

fs.readFile(file, (err, buffer) => {

    if(err) throw new Error(err);

    fs.writeFile(fileName, buffer, (err) => {

        if(err) throw new Error(err);

        console.log('file created');
    })
})