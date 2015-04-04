'use strict';

var express  = require('express')
var app      = express()

var ApiError = require('./lib/error');

var ejwt     = require('express-jwt');
var jwt_secret = require('./config/jwt');

var port     = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

app.use(require('./routes/cors')); // CORS middleware

if (typeof jwt_secret === 'undefined') {
  console.error('Refusing to start without JWT_SECRET');
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

// Login route
app.post('/login', require('./routes/login'));

// User router
app.use('/users', require('./routes/users'));

// Metrics router
app.use('/metrics', require('./routes/metrics'));

// Metrics router
app.use('/blueprints',
  require('body-parser').text({ type: ['text/plain', 'text/x-markdown'] }),
  require('./routes/blueprints')
);

// Health check endpoint
app.get('/', function (req, res) {
  res.send('Astromo API')
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Astromo API listening at http://%s:%s', host, port)
})