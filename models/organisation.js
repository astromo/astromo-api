'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../lib/db');

module.exports = sequelize.define('organisation', {

  name: Sequelize.STRING,

}, {
  comment: 'This is the table containing all Astromo organisations'
});