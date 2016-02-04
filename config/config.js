var config = {
  development: {
    db: {
      username: 'astromo',
      password: 'astromo',
      database: 'astromo',
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  },
  test: {
    db: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  },
  production: {
    db: {
      username: 'root',
      password: null,
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
