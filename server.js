'use strict';

var express  = require('express')
var app      = express()

var ApiError = require('./lib/error');
var log      = require('./lib/logger');

var ejwt     = require('express-jwt');

var port     = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.use(require('body-parser').json())
app.use(require('./routes/cors')); // CORS middleware

function getUserSecret(req, payload, done) {

  var secret = require('./controllers/users').getJWTSecret(payload.sub)
    .then(function(secret) {
      done(null, secret);
    });
};

/**
 * JWT token middleware
 */
app.use(
  ejwt({ secret: getUserSecret })
  .unless({
    path: ['/', '/login']
  })
);

/**
 * Error Handling middleware
 */
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(new ApiError(err));
  }
});

// Login routes
app.post('/login', require('./routes/login'));

// User routes
app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
  res.send('Astromo API')
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Astromo API listening at http://%s:%s', host, port)
})