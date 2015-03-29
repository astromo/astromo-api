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

router.put('/me', function(req, res) {
  res.send('not yet implemented');
});

router.get('/me/invoices', function(req, res) {
  var userid = req.user.sub;

  users.getInvoices(userid).then(function(invoices) {
    res.json(invoices);
  })
  .catch(console.error)
});

module.exports = router;
