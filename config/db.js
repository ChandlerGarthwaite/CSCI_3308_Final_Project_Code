const { Pool } = require('pg');

//****Connection to Heroku database

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
//   });

//****Connection to local database
const pool = new Pool({
  user: 'harrisonayan',
    host: 'localhost',
    database: 'tap-study',
    password: 'harrison',
    port: 5432,
});

//Node-postgres project structure
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('exectuted query', { text, params, duration });
      callback(err, res);
    });
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done);
    });
  }
};
