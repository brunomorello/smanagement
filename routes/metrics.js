const { check, validationResult } = require('express-validator');
const MetricDao = require('../dao/MetricDao');
const MessageOutbound = require('../outbound/MessageOutbound');
const MessageConsumer = require('../outbound/MessageConsumer');

module.exports = (app) => 
{
    app.get('/metrics/metric/:id', (req, res) => {               

        res.status(200);
        res.send('ok');

    });

    app.delete('/metrics/metric/:id', (req, res) => {

        let metric = req.body;
        metric.id = req.params.id;
        metric.status = 'inactive';

        MetricDao.inactive(metric, (error, result) => {

            if(error) {
                res.status(500)
                    .send(error);
                throw error;
            }
            
            console.log(`Executed: ${JSON.stringify(result)}`);

            res.status(204);

            let response = {
                "metric": metric,
                "links": [
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "get",
                        "type": "GET"
                    }
                ]
            };

            res.json(response);

        })

    });

    app.put('/metrics/metric/:id', (req, res) => {

        let metric = req.body;
        metric.id = req.params.id;

        MetricDao.update(metric, (error, result) => {

            if (error) {
                res.status(500).send(error);
                throw error;
            }

            console.log(`Executed: ${JSON.stringify(result)}`);

            res.status(200);

            let response = {
                "metric": metric,
                "links": [                    
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "inactive",
                        "type": "DELETE"
                    },
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "get",
                        "type": "GET"
                    }                    
                ]
            };

            res.json(response);

        });

    });

    app.post('/metrics/metric', [

        check('name').not().isEmpty()
            .withMessage('Metrics must have a Name'),
        check('target').isInt()
            .withMessage('Target must be an Integer')

    ], (req, res) => {  

        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        let metric = req.body;    
        
        // Imports UUID Lib
        const uuidv4 = require('uuid/v4');
        
        // Generating UUID
        metric.id = uuidv4();
        metric.status = 'active';
        metric.creation_date = new Date();

        MetricDao.insert(metric, (error, result) => {
            
            if (error) {
                res.status(400).send(error);
                throw error;
            }

            console.log(`Executed: ${JSON.stringify(result)}`);

            res.location('/metrics/metric/' + metric.id);
            res.status(201);

            let response = {
                "metric": metric,
                "links": [
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "update",
                        "type": "PUT"
                    },
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "inactive",
                        "type": "DELETE"
                    },
                    {
                        "href": `/metrics/metric/${metric.id}`,
                        "rel": "get",
                        "type": "GET"
                    }                    
                ]
            };

            res.json(response);

        });

        MessageOutbound.send(JSON.stringify(metric));

    });

    app.patch('/metrics/', (req, res) => {

        res.json(MessageConsumer.getMessage());

    });

}