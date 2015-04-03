'use strict';

var router      = require('express').Router();
var log         = require('../lib/logger');

var protagonist = require('protagonist');

router.put('/compile', function(req, res) {

  if (!req.is(['text/plain', 'text/x-markdown']))
    return res.status(415).end();

  var blueprint = req.body;

  protagonist.parse(blueprint, function(err, result) {
    if (err) {
      log.error(err);
      return res.status(500).send('oops, something went wrong');
    }

    res.set('Content-Type', 'application/vnd.apiblueprint.ast.raw+json; version=3.0');
    return res.json(result.ast);
  });

});

module.exports = router;
