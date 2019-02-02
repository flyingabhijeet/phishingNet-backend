const express = require('express');
const bodyParser = require('body-parser');
var authenticationRouter = require('./routes/authenticate.js');
var reportRouter = require('./routes/report.js');
var searchRouter = require('./routes/search.js');

var app = express();

app.use(bodyParser.json());

app.use('/api/auth',authenticationRouter);
app.use('/api/report',reportRouter);
app.use('/api/search',searchRouter);

app.listen(process.env.PORT||8080,(status)=>{
    console.log('Server up on the port 8080');
});