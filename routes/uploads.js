//const fileStream = require('../util/FileStream');
const fs = require('fs');

module.exports = (app) => {

    app.post('/upload', (req, res) => {

        let fileName = req.headers.filename;

        req.pipe(fs.createWriteStream(`uploaded_files/${fileName}`))
            .on('finish', () => res.status(201).send('ok'));
            
    });

}