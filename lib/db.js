'use strict';

var Sequelize = require('sequelize');

var conString = 'postgres://astromo:astromo@192.168.33.10:5432/astromo';

var sequelize = new Sequelize(conString, {
  pool: {
    max  : 5,
    min  : 0,
    idle : 10000
  },
  define: {
    underscored: true, // user underscore notation for all table and column names
  }
});

sequelize.sync({  }); // create tables if they don't exist yet

module.exports = sequelize;
