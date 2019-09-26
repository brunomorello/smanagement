//const fileStream = require('../util/FileStream');
const fs = require('fs');

module.exports = (app) => {

    app.post('/upload', (req, res) => {

        console.log(`receiving file`);

        let fileName = req.headers.filename;

        req.pipe(fs.createWriteStream(`uploaded_files/${fileName}`))
            .on('finish', () => {

                console.log(`file received`);

                res.status(201).send('ok');

            });

    });

}