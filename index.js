var path = require('path'),
    express = require('express'),
    app = express(),
    busboy = require('connect-busboy'),
    route = require('./route/route');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(busboy()); 
//Main end point to upload and get queried data
app.get('/', function(req, res) { res.render('index')});
app.post('/pdf', route.uploadFile);
// API to get bank detail by IFSC codes
app.get('/banks', route.getBanks);
app.listen(8000, function () {
    console.log('Pdf data extracter is runnig on 8000!');
});

