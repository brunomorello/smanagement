let express = require('express');
let app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');    
});

app.get('/test', (req, res) => {
    console.log('req received!!');
    res.send('ok');
})