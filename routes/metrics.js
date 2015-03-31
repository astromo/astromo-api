'use strict';

var request = require('request');
var log     = require('../lib/logger');
var router  = require('express').Router();

router.get('/latency', function(req, res) {

  // TODO: figure out database name from userid (through organisation)
  var db     = 'test';

  var query  = 'SELECT mean(ms) FROM latency WHERE time > now() - 2h GROUP BY time(1s) fill(0)';

  var qs = {
    db : db,
    q  : query
  };

  request({
    url  : 'http://localhost:8086/query?' + qs,
    json : true,
    qs   : qs
  }, function(err, resp, body) {
    var values = [];

    if (err) {
      log.error('Could not connect to the Metrics Database');
      res.json(values);
    }

    try {
      values = body.results[0].series[0].values;
    } catch(e) {
      // shhh
    }

    res.json(values);
  })

});

module.exports = router;
