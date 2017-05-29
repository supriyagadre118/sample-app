'use strict';

module.exports = function(app) {
  var jsonfileservice = require('./utils/jsonfileservice')();
  var fs = require('fs');

  var endpoints = [{
    path: '/api/sample-data',
    method: 'get',
    response: {
      status: 200,
      output: '/../../data/sampledata.json'
    }
  }];

  for (var i = 0; i < endpoints.length; i++) {
    var endpoint = endpoints[i];

    switch (endpoint.method) {
      case 'get':
        app.get(endpoint.path, respond(endpoint));
        break;
      case 'post':
        app.post(endpoint.path, respond(endpoint));
        break;
    }
  }

  function respond(endpoint) {
    return function(req, res, next) {
      var response = endpoint.response;
      var output;
      var contentType = '';

      if (response.status) {
        res.status(response.status);
      }

      if (response.headers) {
        for (var prop in response.headers) {
          var headerString = getHeaderString(prop);

          if (headerString) {
            res.set(headerString, response.headers[prop]);
          }

          if (prop === 'contentType') {
            contentType = response.headers[prop];
          }
        }
      }

      if (contentType) {
        if (contentType === 'application/pdf') {
          var filepath = __dirname + response.output;
          var stream = fs.createReadStream(filepath);
          stream.pipe(res);
        }
        else {
          output = jsonfileservice.getJsonFromFile(response.output);
          res.send(output);
        }
      }
      else {
        output = jsonfileservice.getJsonFromFile(response.output);

        if (endpoint.timeout) {
          setTimeout(function() {
            res.send(output);
          }, endpoint.timeout);
        }
        else {
          res.send(output);
        }
      }
    };
  }

  function getHeaderString(key) {
    switch (key) {
      case 'contentType':
        return 'Content-Type';
    }
  }
};
