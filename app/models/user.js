var pg = require('pg');

//***Connection to Heroku Database
//var conString = process.env.DATABASE_URL;
//var client = new pg.Client(conString);

//***Connection to local database***
var client = new pg.Client({
  user: 'harrisonayan',
  host: 'localhost',
  database: 'harrisonayan',
  password: 'harrison',
  port: 5432,
});

function User(){
  this.user_id = 0;
  this.first_name = "";
  this.last_name = "";
  this.username = "";
  this.password = "";
  this.email = "";

  this.save = function(callback) {
    //var conString = process.env.DATABASE_URL;
    //var client = new pg.Client(conString);
    var client = new pg.Client({
      user: 'harrisonayan',
      host: 'localhost',
      database: 'harrisonayan',
      password: 'harrison',
      port: 5432,
    });

    client.connect();

    console.log(this.username + ' will be saved');

    client.query('INSERT INTO users(first_name, last_name, username, password, email) VALUES($1, $2, $3, $4, $5)', [this.first_name, this.last_name, this.username, this.password, this.email], function (err, result) {
      if (err){
        console.log(err);
        return console.error('error running query(user.save): ', err);
      }
      console.log(result.rows);
    });
    client.query('SELECT * FROM users ORDER BY user_id DESC LIMIT 1', null, function(err, result) {
      if (err){
        return callback(null);
      }
      if (result.rows.length > 0){
        console.log(result.rows[0] + 'is found');
        var user = new User();
        user.user_id = result.rows[0]['user_id'];
        user.first_name = result.rows[0]['first_name'];
        user.last_name = result.rows[0]['last_name'];
        user.username = result.rows[0]['username'];
        user.password = result.rows[0]['password'];
        user.email = result.rows[0]['email'];
        console.log(user.username);
        client.end();
        return callback(user);
      }
    });
  };
}

User.findOne = function(username, callback){
  //var conString = process.env.DATABASE_URL;
  //var client = new pg.Client(conString);

  var client = new pg.Client({
    user: 'harrisonayan',
    host: 'localhost',
    database: 'harrisonayan',
    password: 'harrison',
    port: 5432,
  });
    

  var notAvailable = false;
  console.log(username + ' findOne function test');
  client.connect();

  client.query('SELECT * FROM users WHERE username=$1', [username], function(err, result) {
    if (err){
      return callback(err, available, this);
    }
    if(result.rows.length > 0){
      notAvailable = true;
      console.log(username + ' is not available');
      this.user_id = result.rows[0]['user_id'];
      this.first_name = result.rows[0]['first_name'];
      this.last_name = result.rows[0]['last_name'];
      this.username = result.rows[0]['username'];
      this.password = result.rows[0]['password'];
      this.email = result.rows[0]['email'];
    }
    else{
      notAvailable = false;
      console.log(username + ' is available');
    }
    client.end();
    return callback(false, notAvailable, this);
  });
};

User.findById = function(id, callback){
  //var conString = process.env.DATABASE_URL;
  //var client = new pg.Client(conString);
  
  var client = new pg.Client({
    user: 'harrisonayan',
    host: 'localhost',
    database: 'harrisonayan',
    password: 'harrison',
    port: 5432,
  });
    
  console.log('find by id');

  client.connect();
  client.query('SELECT * FROM users WHERE user_id=$1', [id], function(err, result) {
    if(err){
      return callback(err, null);
    }
    if(result.rows.length > 0){
      console.log(result.rows[0] + 'is found');
      var user = new User();
      user.user_id = result.rows[0]['user_id'];
      user.first_name = result.rows[0]['first_name'];
      user.last_name = result.rows[0]['last_name'];
      user.username = result.rows[0]['username'];
      user.password = result.rows[0]['password'];
      user.email = result.rows[0]['email'];
      console.log(user.username);
      return callback(null, user);
    }
  });
};

module.exports = User;
