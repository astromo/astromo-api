'use strict';

var express    = require('express')
var router     = express.Router()

var ApiError   = require('../lib/error')

var users      = require('../controllers/users')

var jwt        = require('jsonwebtoken')
var jwt_secret = require('../config/jwt')

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

  if (!users.isValidUser(username, password))
    return res.status(401).json(new ApiError({
      message : 'username / password combination invalid',
      code    : 'invalid_login',
      status  : 401
    }))

  req.user = users.getUserByCredentials(username, password);

  next()
})

/**
 * Return JWT signed token
 */
router.use('/', function(req, res) {

  var payload = {
    sub       : req.user.id,
    full_name : req.user.full_name,
    scopes    : req.user.scopes
  };

  var token = jwt.sign(payload, jwt_secret)
  res.json({ token: token })

})

module.exports = router;