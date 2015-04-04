'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../lib/db');

module.exports = sequelize.define('blueprint', {

  name        : Sequelize.STRING,
  description : Sequelize.TEXT,
  slug        : Sequelize.STRING,

  markdown    : Sequelize.TEXT,
  ast         : Sequelize.JSON,

}, {
  comment: 'This is the table containing all Astromo blueprints'
});