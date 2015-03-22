'use strict';

var express  = require('express')
var app      = express()

var ApiError = require('./lib/error');

var ejwt      = require('express-jwt');

app.use(require('morgan')('dev'));
app.use(require('body-parser').json())

var jwt_secret = require('./config/jwt')

/**
 * JWT token middleware
 */
app.use(
  ejwt({
    secret: jwt_secret
  })
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

app.post('/login', require('./routes/login'))

app.get('/', function (req, res) {
  res.send('Astromo API')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Astromo API listening at http://%s:%s', host, port)
})