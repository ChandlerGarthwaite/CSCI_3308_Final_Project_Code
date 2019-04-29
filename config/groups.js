var pg = require('pg');

//var conString = process.env.DATABASE_URL;
//var client = new pg.Client(conString);

var client = new pg.Client({
  user: 'harrisonayan',
  host: 'localhost',
  database: 'tap-study',
  password: 'harrison',
  port: 5432,
});
var User = require('../app/models/user');

function newGroup(){
  
}
