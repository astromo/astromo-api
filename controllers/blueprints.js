'use strict';

var Blueprint    = require('../models/blueprint');

var protagonist = require('protagonist');

exports.compile = function(blueprint, callback) {
  protagonist.parse(blueprint, callback);
};

exports.get = function(options) {
  return Blueprint.findOne({ where : options });
};
