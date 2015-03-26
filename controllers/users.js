'use strict';

var sequelize = require('../lib/db');
var User      = require('../models/user');

/**
 * Single query to determine wether a username and password combination are
 * valid.
 *
 * Also returns the user id when the user exists (wether valid or not)
 */
exports.isValidLogin = function(email, password) {
  var qry = 'SELECT password = crypt(:password, password) AS valid, id \
    FROM users WHERE email=:email AND password=password LIMIT 1;'

  return sequelize.query(qry, { replacements: { email: email, password: password }, type: sequelize.QueryTypes.SELECT })
    .then(function(results) {

      // empty results -> user does not exist
      if (typeof results[0] === 'undefined') {
        return [false];
      }

      var valid = results[0].valid;
      var id    = results[0].id;

      return [valid, id];
    });
};

exports.getUserById = function(id) {
  return User.find(id);
}
