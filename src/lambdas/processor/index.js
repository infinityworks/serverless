'use strict';

const DEV = process.env.DEV_MODE == 'true';

const AWS = require('aws-sdk');
const uniqueId = require('./uniqueId');

if (DEV) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'aaa',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'bbb',
    region: process.env.AWS_REGION || 'us-west-2',
    endpoint: process.env.AWS_DYNAMODB_ENDPOINT
  })
}

const docClient = new AWS.DynamoDB.DocumentClient();

function getEnv(context) {
  return context.functionName.split('_')[0];
}

function getTableName(context) {
  return getEnv(context) + '-submissions';
}

function removeEmptyStringElements(obj) {
 for (let prop in obj) {
   if (typeof obj[prop] === 'object') {
     removeEmptyStringElements(obj[prop]);
   } else if(obj[prop] === '') {// delete elements that are empty strings
     delete obj[prop];
   }
 }

 return obj;
}

function getHandler(docClient, uniqueId) {
  function handler(event, context, callback) {
    event = removeEmptyStringElements(event);

    event.id = uniqueId.generate();
    event.dateCreated = (new Date()).toString();
    console.log('Inserting submission with ID: ', event.id);

    docClient.put({ TableName: getTableName(context), Item: event }, function(err, data) {
      if (err) {
        console.log('[ERROR] Failed to insert application. Error JSON: ', JSON.stringify(err, null, 2));
        return;
      }

      console.log('Inserted submission: ', JSON.stringify(data, null, 2));

      callback(null, {
        status: 'success',
        submissionId: event.id
      });
    });

  }

  return handler;
}

exports.handler = getHandler(docClient, uniqueId);
