const { check, validationResult } = require('express-validator');
const MetricDao = require('../dao/MetricDao');
const MessageOutbound = require('../outbound/MessageOutbound');
const MessageConsumer = require('../outbound/MessageConsumer');
const ServiceNowAPI = require('../services/REST/ServiceNowAPI');
const MemcachedClient = require('../services/cache/MemcachedClient');

module.exports = (app) => 
{

    app.get('/snow', (req, res) => {

        let snowQueryParam = "/api/now/table/incident?sysparm_fields=sys_id,number,assignment_group&sysparm_display_value=true&sysparm_query=active=true^assignment_group=b9797de1db633300723e146139961999";

        // Before Call API Check if data exists on Cache
        MemcachedClient.get('snowOpenTickets', (err, result) => {

            if (err) {
                res.status(500)
                    .send(err);
                throw err;
            } 

            // MISS - No Cache Found - Query SN API
            if(!result) {                                                       

                ServiceNowAPI.get(snowQueryParam, (error, reqApi, resApi, obj) => {

                    if (error) {
                        res.status(500)
                            .send(error);
                        throw error;
                    }

                    MemcachedClient.set('snowOpenTickets', obj, 15000, (errMemcachedSet) => {
                        throw errMemcachedSet
                    });

                    res.status(200);
                    res.json(obj);

                });

            } else {
                
                //HIT - Cache Found
                res.status(200);
                res.json(result);

            }

        });

    });

    app.get('/metrics/metric/:id', (req, res) => {               

        let metricID = req.params.id;

        MetricDao.get(metricID, (error, results, fields) => {

            if(error) {
                res.status(500)
                    .send(error);
                throw error;                    
            }

            let metric = results;

            //console.log(`results: ${JSON.stringify(results)}`);       
            //console.log(`fields: ${JSON.stringify(fields)}`);       

            res.status(200);

            let response = {
                "metric": metric,
                "links": [
                    {
                        "href": `/metrics/metric/${metricID}`,
                        "rel": "update",
                        "type": "PUT"
                    },
                    {
                        "href": `/metrics/metric/${metricID}`,
                        "rel": "inactive",
                        "type": "DELETE"
                    },
                    {
                        "href": `/metrics/metric/${metricID}`,
                        "rel": "get",
                        "type": "GET"
                    }
                ]
            };

            res.json(response);


        });

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

        // Post this metric on RabbitMQ 
        MessageOutbound.send(JSON.stringify(metric));

    });

    app.patch('/metrics/', (req, res) => {

        res.json(MessageConsumer.getMessage());

    });

}