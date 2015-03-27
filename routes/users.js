'use strict';

var router = require('express').Router();

var users = require('../controllers/users');

router.get('/me', function(req, res) {
  var userid = req.user.sub; // decoded by "express_jwt" middleware

  users.getUserById(userid).then(function(user) {
    res.json(user);
  })
  .catch(console.error)

});

router.get('/:userid', function(req, res) {
  var userid = req.params.userid;

  users.getUserById(userid).then(function(user) {
    res.json(user);
  })
  .catch(console.error)

});

router.put('/:userid', function(req, res) {

});

module.exports = router;
