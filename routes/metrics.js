'use strict';

var Influx  = require('node-influx');
var log     = require('../lib/logger');
var _       = require('lodash');
var promise = require('bluebird');
var router  = require('express').Router();

// /!\ TODO: figure out database name from userid (through organisation)
  var client = new Influx({
    host : 'astromo.dev',
    db   : 'test',
  });

router.get('/latency', function(req, res) {

  // figure out 90th percentile
  client.query('SELECT percentile(ms, 95) FROM latency').then(function(results) {

    var percentile = results[0].series[0].values[0][1];

    var query  = 'SELECT mean(ms) FROM latency \
      WHERE time > now() - 10m \
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

/**
 * Metrics for the dashboard overview, should not include heavy computational
 * queries
 */
router.get('/overview', function(req, res) {

  // for the last 5 minutes
  var metrics = [
    // mean latency
    client.query('SELECT mean(ms) FROM latency WHERE time > now() - 5m fill(0)'),
    // 90th percentile
    client.query('SELECT percentile(ms, 90) FROM latency WHERE time > now() - 5m fill(0)'),
    // number of requests
    client.query('SELECT (count(ms) / 300) as reqss FROM latency WHERE time > now() - 5m fill(0)')
  ];

  // we'll settle for any successful requests
  promise.settle(metrics).then(function(results) {

    // report failed queries
    var failed = _.filter(results, function(result) {
      return result.isRejected();
    });
    _.each(failed, function(failure) {
      log.error('Failed query: %j', failure.reason());
    });

    // find all fulfilled promises
    results = _.chain(results)
      .filter(function(result) {
        return result.isFulfilled();
      })
      .map(function(result) {
        return {
          query  : result.value()[0].series[0].columns[1],
          result : result.value()[0].series[0].values[0][1]
        };
      })
      .value();

    res.json(results);
  });

});

module.exports = router;
