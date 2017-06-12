'use strict';

function getHandler(validator, kms, docClient, uniqueId) {
  function handler(event, context, callback) {
    callback(null, { status: 'success' });
  }

  return handler;
}

exports.handler = getHandler();
