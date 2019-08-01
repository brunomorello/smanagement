import { MetricDao } from "../dao/MetricDao";
import { ConnectionFactory } from "../dao/ConnectionFactory";

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

        let connection = new ConnectionFactory();

        let metricDao = new MetricDao(connection);

        metricDao.insert(metric, (error, result) => {
            console.log(`post received ${metric.text}`);
            console.log('metric created');
            res.json(metric);
        });

        //res.send(metric);

    });
}