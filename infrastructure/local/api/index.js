// ===================================
//  LOCAL API Gateway mock server
// ===================================*/
'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'aaa',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'bbb',
  region: process.env.AWS_REGION || 'us-west-2',
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var dynamoDb = new aws.DynamoDB();

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

app.post('/api/submission', function(req, res) {
  var callback = function(err, result) {
    if (err) {
      var status = err.match(/^\[FORBIDDEN\].*/g) ? 403 : 500;
      res.status(status).send(JSON.stringify({
        error: err
      }));

      return;
    }

    return res.send(JSON.stringify(result));
  };

  processor.handler(req.body, {
    functionName: 'dev_submission_processor'
  }, callback);
});

app.get('/api/createdb/', function (req, res) {
    req.client_ip = '127.0.0.1';

    var callback = function (err, result) {
      if (err) {
        var status = err.match(/^\[FORBIDDEN\].*/g) ? 403 : 500;
        res.status(status).send(JSON.stringify({
          error: err
        }));

        return;
      }

      res.send(JSON.stringify(result));
    };

    let params = {
      TableName: 'dev-submissions',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }  //Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    dynamoDb.createTable(params, function (err, data) {
      if (err) {
        callback(err);
        return;
      }

      console.log('Created table. Table description JSON: ' + JSON.stringify(data, null, 2));

      dynamoDb.listTables(function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        callback(null, data);
      });
    });
});

console.log('Starting server on: http://localhost:' + app.get('port') + '/');
httpsServer.listen(app.get('port'));
