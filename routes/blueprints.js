'use strict';

var router      = require('express').Router();
var log         = require('../lib/logger');

var blueprints  = require('../controllers/blueprints');

router.put('/compile', function(req, res) {

  if (!req.is(['text/plain', 'text/x-markdown']))
    return res.status(415).end();

  var blueprint = req.body;

  blueprints.compile(blueprint, function(err, result) {

    if (err) {
      log.error(err);
      return res.status(500).send('oops, something went wrong');
    }

    res.set('Content-Type', 'application/vnd.apiblueprint.ast.raw+json; version=3.0');
    return res.json(result.ast);
  });

});

router.get('/:id', function(req, res) {
  var identifier = req.params.id,
      options    = {};

  if (isFinite(identifier))
    options.id = identifier;
  else
    options.slug = identifier;

  blueprints.get(options).then(function(blueprint) {
    return res.json(blueprint);
  })
  .catch(function(ex) {
    return res.status(500).send(ex)
  });

});

module.exports = router;
