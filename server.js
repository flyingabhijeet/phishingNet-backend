const express = require('express');
const bodyParser = require('body-parser');
var authenticationRouter = require('./routes/authenticate.js');
var reportRouter = require('./routes/report.js');
var searchRouter = require('./routes/search.js');
var helmet = require('helmet');

var app = express();

app.use(bodyParser.json());

app.use('/api/auth',authenticationRouter);
app.use('/api/report',reportRouter);
app.use('/api/search',searchRouter);

app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log('Header Added')
    // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');
     // Request methods you wish to allow
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,PATCH,DELETE");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Boundary,Access-Control-Request-Method, Access-Control-Request-Headers,x-auth");
     res.setHeader("Access-Control-Expose-Headers", "x-auth");
     // Pass to next layer of middleware
     next();
  });

app.listen(process.env.PORT||8080,(status)=>{
    console.log('Server up on the port 8080');
});