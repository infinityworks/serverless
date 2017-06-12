// ===================================
//  LOCAL API Gateway mock server
// ===================================*/
'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var processor = require('/lambdas/processor');

var app = express();

// Enable SSL termination
var httpsServer = https.createServer({
  key: fs.readFileSync('/pki/serverless.key', 'utf8'),
  cert: fs.readFileSync('/pki/serverless.pem', 'utf8')
}, app);

app.set('port', (process.env.PORT || 8888));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/', function(req, res) {
    res.send('-- local API gateway online --');
});

console.log('Starting server on: http://localhost:' + app.get('port') + '/');
httpsServer.listen(app.get('port'));
