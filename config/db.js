const { Pool } = require('pg');

//****Connection to Heroku database
const conString = process.env.DATABASE_URL;
const pool = new Pool(conString);

//****Connection to local database
// const pool = new Pool({
//   user: 'harrisonayan',
//     host: 'localhost',
//     database: 'tap-study',
//     password: 'harrison',
//     port: 5432,
// });

//Node-postgres project structure
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('exectuted query', { text, params, duration, rows: res.rowCount });
      callback(err, res);
    });
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query.bind(client);

      client.query = () => {
        client.lastQuery = arguments;
        client.query.apply(client, arguments);
      }

      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 sec');
        console.error('The last query exectuted on this client was: ${client.lastQuery}');
      }, 5000);

      const release = (err) => {
        done(err);
        clearTimeout(timeout);
        client.query = query;
      }

      callback(err, client, done);
    });
  }
};
