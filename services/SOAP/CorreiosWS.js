class CorreiosWS {

    checkDeliveryDate(cepDelivery, callback) {

        let soap = require('soap');

        soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl', (err, client) => {

            if(err) {
                throw err;
            }

            let requestBody = {
                "nCdServico": "40010",
                "sCepOrigem": "01321010",
                "sCepDestino": cepDelivery.cep
            };

            client.CalcPrazo(requestBody, callback);
        });

    }

}

module.exports = new CorreiosWS;


