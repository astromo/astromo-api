var bunyan = require('bunyan');
var log    = bunyan.createLogger({
  name: 'Astromo API',
  streams: [{
    level  : 'info',
    stream : process.stdout
  },
  {
    level : 'error',
    path  : 'error.log'
  }]
});

module.exports = log;