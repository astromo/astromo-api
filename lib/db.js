'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');
var config = require('../config/config');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, _.extend({
  pool: {
    max  : 5,
    min  : 0,
    idle : 10000
  },
  define: {
    underscored: true, // user underscore notation for all table and column names
  }
}, config.db));

sequelize.sync({  }); // create tables if they don't exist yet

module.exports = sequelize;
