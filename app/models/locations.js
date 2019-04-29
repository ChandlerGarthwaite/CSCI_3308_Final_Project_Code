var pg = require('pg');

//***Connection to Heroku Database
var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);

//***Connection to local database***
// var client = new pg.Client({
//   user: 'harrisonayan',
//   host: 'localhost',
//   database: 'tap-study',
//   password: 'harrison',
//   port: 5432,
// });

Locations = new Object();
  Locations.benson = [];
  Locations.case_ = [];
  Locations.engineering = [];
  Locations.gemmill = [];
  Locations.koelbel = [];
  Locations.norlin = [];
  Locations.wise = [];
  Locations.bensonCount = 0;
  Locations.case_Count = 0;
  Locations.engineeringCount = 0;
  Locations.gemmillCount = 0;
  Locations.koelbelCount = 0;
  Locations.norinCount = 0;
  Locations.wiseCount = 0;



Locations.getGroupInfo = function(callback) {
  var conString = process.env.DATABASE_URL;
  var client = new pg.Client(conString);

  // var client = new pg.Client({
  //   user: 'harrisonayan',
  //   host: 'localhost',
  //   database: 'tap-study',
  //   password: 'harrison',
  //   port: 5432,
  // });
  client.connect();

  client.query('SELECT * FROM groups ORDER BY location', null, function(err, result) {
    if (err){
      return callback(err,this);
    }if(result.rows.length > 0){
      for (var i = 0; i < result.rows.length; i++) {
        if(result.rows[i]['location'] == 1){
          Locations.benson.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.bensonCount += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 2){
          Locations.case_.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.case_Count += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 3){
          Locations.engineering.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.engineeringCount += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 4){
          Locations.gemmill.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.gemmillCount += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 5){
          Locations.koelbel.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.koelbelCount += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 6){
          console.log(result.rows[i]['members'].length + ' studying ' + result.rows[i]['subject'] );
          Locations.norlin.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.norlinCount += result.rows[i]['members'].length;
        }
        if(result.rows[i]['location'] == 7){
          Locations.wise.push(result.rows[i]['members'].length + ' people studying ' + result.rows[i]['subject'] );
          Locations.wiseCount += result.rows[i]['members'].length;
        }
      }
    }
    client.end();
    return callback(false, Locations);
  });
};

Locations.getGroupId = function(subject, id,callback) {
  var conString = process.env.DATABASE_URL;
  var client = new pg.Client(conString);

  // var client = new pg.Client({
  //   user: 'harrisonayan',
  //   host: 'localhost',
  //   database: 'tap-study',
  //   password: 'harrison',
  //   port: 5432,
  // });
  client.connect();
  var currentGroup = false
  client.query('SELECT * FROM groups WHERE subject=$1 AND location=$2',[subject, id], function(err, result) {
    if(err){
      console.log(err);
      return callback(currentGroup,null);
    }if(result.rows.length>0){
      currentGroup=true;
      var group_id = result.rows[0]['group_id'];
      console.log(group_id);
      client.end()
      return callback(currentGroup, group_id);
    }
    else{
      return callback(currentGroup, null);
    }
  });
};




module.exports = Locations;
