'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../lib/db');

module.exports = sequelize.define('user', {

  email: {
    type      : Sequelize.STRING,
    allowNull : false,
    unique    : true ,
    validate  : {
      isEmail : true
    }
  },
  password   : Sequelize.STRING,

  first_name : Sequelize.STRING,
  last_name  : Sequelize.STRING,

  title      : Sequelize.STRING,
  avatar     : Sequelize.STRING,

}, {

  comment: 'This is the table containing all Astromo users',

  getterMethods   : {
    full_name: function() { return this.first_name + ' ' + this.last_name }
  },

});