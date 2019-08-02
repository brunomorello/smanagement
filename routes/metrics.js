module.exports = (app) => {
    app.get('/metrics', (req, res) => {
       
        console.log('requisition for metrics received');
        res.send('ok');
    });

    app.post('/metrics/metric', (req, res) => {  

        let metric = req.body;

        metric.id = '222222';
        metric.status = 'active';
        metric.creation_date = new Date();

        const MetricDao = require('../dao/MetricDao');

        MetricDao.insert(metric, (error, result) => {
            
            if (error) throw error;

            console.log(`Executed: ${JSON.stringify(result)}`);            

            res.json(metric);

        });

    });
}