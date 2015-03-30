'use strict';

var express    = require('express');
var router     = express.Router();

var ApiError   = require('../lib/error');

var users      = require('../controllers/users');

var jwt        = require('jsonwebtoken');
var jwt_secret = require('../config/jwt');

/**
 * Authentication check
 */
router.use('/', function(req, res, next) {

  var username    = req.body.username
  var password    = req.body.password

  if (!username || !password)
    return res.status(400).json(new ApiError({
      message : 'username or password missing',
      code    : 'missing_credentials',
      status  : 400
    }))

  users.isValidLogin(username, password)
    .spread(function(valid, id) {

      if (!valid)
        return res.status(401).json(new ApiError({
          message : 'username / password combination invalid',
          code    : 'invalid_login',
          status  : 401
        }))

      users.getUserById(id)
        .then(function(user) {
          req.user = user
          next()
        })
    })
    .catch(function(err) {
      return exports.unspecifiedError(res, err);
    });



})

exports.unspecifiedError = function(res, err) {
  console.log(err);
  return res.status(500).json(new ApiError({
    message : 'something went wrong',
    code    : 'undefined_error',
    status  : 500
  }))
};

/**
 * Return JWT signed token
 */
router.use('/', function(req, res) {

  var payload = {
    sub       : req.user.id,
    full_name : req.user.full_name,
    scopes    : req.user.scopes
  };

  var token = jwt.sign(payload, jwt_secret);
  res.json({ token: token });

})

module.exports = router;