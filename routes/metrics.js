'use strict';

var Influx  = require('node-influx');
var log     = require('../lib/logger');
var router  = require('express').Router();

router.get('/latency', function(req, res) {

  // TODO: figure out database name from userid (through organisation)
  var client = new Influx({
    host : 'astromo.dev',
    db   : 'test',
  });

  // figure out 90th percentile
  client.query('SELECT percentile(ms, 95) FROM latency').then(function(results) {

    var percentile = results[0].series[0].values[0][1];

    var query  = 'SELECT mean(ms) FROM latency \
      WHERE time > now() - 2h \
      AND ms < ' + percentile + ' \
      GROUP BY time(1s)';

    return client.query(query).then(function(results) {
      try {
        return results[0].series[0].values;
      } catch(e) {
        return [];
      }
    });

  })
  .then(function(values) {
    res.json(values);
  })
  .catch(function(err) {
    log.error(err);
    res.json([]);
  });

});

module.exports = router;
