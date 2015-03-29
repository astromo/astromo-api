'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../lib/db');

module.exports = sequelize.define('invoice', {

  date        : Sequelize.DATE,
  description : Sequelize.STRING,
  amount      : Sequelize.FLOAT,
  attachment  : Sequelize.STRING,

}, {
  comment: 'This is the table containing all Astromo invoices'
});