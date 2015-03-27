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

var jwt_secret = require('./config/jwt')

if (!jwt_secret) {
  log.error('Refusing to start server without JWT_SECRET');
  process.exit(1);
}

/**
 * JWT token middleware
 */
app.use(
  ejwt({ secret: jwt_secret })
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