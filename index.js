let app = require('./config/custom-express.js')();

app.listen(3000, () => {
    console.log('Server running on port 3000');    
});