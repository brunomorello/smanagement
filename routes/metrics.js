const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    app.get('/metrics', (req, res) => {
       
        console.log('requisition for metrics received');
        res.send('ok');
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

        const MetricDao = require('../dao/MetricDao');

        MetricDao.insert(metric, (error, result) => {
            
            if (error) {
                res.status(400).send(error);
                throw error;
            }

            console.log(`Executed: ${JSON.stringify(result)}`);

            res.location('/metrics/metric/' + metric.id);
            res.status(201);
            res.json(metric);

        });

    });
}