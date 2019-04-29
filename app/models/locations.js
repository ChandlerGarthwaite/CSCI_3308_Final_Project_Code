var pg = require('pg');

//***Connection to Heroku Database
//var conString = process.env.DATABASE_URL;
//var client = new pg.Client(conString);

//***Connection to local database***
var client = new pg.Client({
  user: 'harrisonayan',
  host: 'localhost',
  database: 'tap-study',
  password: 'harrison',
  port: 5432,
});

Locations = new Object();
  Locations.benson = [];
  Locations.case_ = [];
  Locations.engineering = [];
  Locations.gemmill = [];
  Locations.koelbel = [];
  Locations.norlin = [];
  Locations.wise = [];



Locations.getGroupInfo = function(callback) {
  //var conString = process.env.DATABASE_URL;
  //var client = new pg.Client(conString);

  var client = new pg.Client({
    user: 'harrisonayan',
    host: 'localhost',
    database: 'tap-study',
    password: 'harrison',
    port: 5432,
  });
  client.connect();

  client.query('SELECT * FROM groups ORDER BY location', null, function(err, result) {
    if (err){
      return callback(err,this);
    }if(result.rows.length > 0){
      for (var i = 0; i < result.rows.length; i++) {
        if(result.rows[i]['location'] == 1){
          Locations.benson.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 2){
          Locations.case_.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 3){
          Locations.engineering.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 4){
          Locations.gemmill.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 5){
          Locations.koelbel.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 6){
          console.log(result.rows[i]['members'].length + ' studying ' + result.rows[i]['subject'] );
          Locations.norlin.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
        if(result.rows[i]['location'] == 7){
          Locations.wise.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
        }
      }
    }
    client.end();
    return callback(false, Locations);
  });
};




module.exports = Locations;
