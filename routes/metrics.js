'use strict';

var request     = require('request');

var router = require('express').Router();

router.get('/latency', function(req, res) {

  // TODO: figure out database name from userid (through organisation)
  var db     = 'localhost';
  var target = 'google.be';

  var query  = 'SELECT mean(ms) FROM latency WHERE time > now() - 15m AND host=\'' + target + '\' GROUP BY time(1s)';

  var qs = {
    db : db,
    q  : query
  };

  request({
    url  : 'http://localhost:8086/query?' + qs,
    json : true,
    qs   : qs
  }, function(err, resp, body) {
    if (err)
      throw err;

    res.json(body.results[0].series[0].values);
  })

});

module.exports = router;
