const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');
const path = require('path');
var authentication = require('./routes/authenticate.js');
var reportRouter = require('./routes/report.js');
var searchRouter = require('./routes/search.js');
// var cors = require('cors');
var app = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
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
    
app.use('/api/auth',authentication[0]);
app.use('/api/report',reportRouter);
app.use('/api/search',searchRouter);
app.use('/*', express.static(path.join(__dirname, 'public')));

// app.use(cors());

app.listen(process.env.PORT||8080,(status)=>{
    console.log('Server up on the port 8080');
});

module.exports = {app};