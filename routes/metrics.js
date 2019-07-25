module.exports = (app) => {
    app.get('/metrics', (req, res) => {
       
        console.log('requisition for metrics received');
        res.send('ok');
    });

    app.post('/metrics/metric', (req, res) => {  

        let metric = req.body;

        console.log(`post received ${metric}`);
        res.send('ok');

    });
}