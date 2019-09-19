const CorreiosWS = require('../services/SOAP/CorreiosWS');

module.exports = (app) => {

    app.post("/correios", (req, res)=> {

        let cepDelivery = req.body;

        CorreiosWS.checkDeliveryDate(cepDelivery, (err, result) => {

            if(err) {
                res.status(500).send(err);
                return;
            }

            res.json(result);

        });
        
    });

};