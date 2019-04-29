module.exports = function(app, passport) {
  var pg = require('pg');
  var Locations = require('../app/models/locations');
  //***Connection to Heroku Database
  var conString = process.env.DATABASE_URL;
  var pool = new pg.Pool(conString);

  //***Connection to local database***
  // var pool = new pg.Pool({
  //   user: 'harrisonayan',
  //   host: 'localhost',
  //   database: 'tap-study',
  //   password: 'harrison',
  //   port: 5432,
  // });
  //Home register/login page
  app.get('/', function(req, res) {
    res.render('pages/register.ejs', {
      //message: req.flash('loginMessage'),
      title: "Register/Login"
    });
  });

  //login
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));
  //register
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));


  app.get('/home', isLoggedIn, function(req, res) {

    // var pool = new pg.Pool({
    //   user: 'harrisonayan',
    //   host: 'localhost',
    //   database: 'tap-study',
    //   password: 'harrison',
    //   port: 5432,
    // });




    Locations.getGroupInfo(function(err, locations) {
      if( err){
        console.log(err);
      }
      else {
        console.log('norlin:' ,locations.case_);

        res.render('pages/homePage.ejs' ,{
          user: req.user,
          title: "Home",
          benson: locations.benson,
          case_: locations.case_,
          engineering: locations.engineering,
          gemmill: locations.gemmill,
          koelbel: locations.koelbel,
          norlin: locations.norlin,
          wise: locations.wise,
          bensonCount:locations.bensonCount
          // case_Count:locations.case_Count,
          // engineeringCount:locations.engineeringCount,
          // gemillCount:locations.gemmillCount,
          // koelbelCount:locations.koelbelCount,
          // norlinCount:locations.norinCount,
          // wiseCount:locations.wiseCount
        });
      }
    });
      });

    //console.log(req.user);


  app.get('/profile', isLoggedIn, function(req, res) {
    client.connect();
    var name = req.user.first_name + ' ' + req.user.last_name;
    client.query('SELECT * FROM users WHERE user_id=$1', [req.user.user_id], function(err, result) {
      if(err) {
        return err;
      } else {
          var study_status = result.rows[0]['study_status']
          var major = result.rows[0]['major'];
          var grade = result.rows[0]['grade'];
          var hometown = result.rows[0]['hometown'];
          if (study_status == false)
            study_status = 'Not Currently Studying';
          if (study_status == true)
            study_status = 'Studying Now';
          if (major == null)
            major = 'N.A.';
          if( grade == null)
            grade = 'N.A.';
          if(hometown == null)
            hometown = 'N.A.';
            client.end();
          res.render('pages/profile.ejs' , {
            user: req.user,
            title: "Profile",
            name: name,
            username: req.user.username,
            study_status: study_status,
            major: major,
            grade: grade,
            hometown: hometown
        });
      }
    });
    //console.log(req.user);
  });

  app.post('/profile/edit', function(req, res) {
    var name = req.body.name.split(" ");
    var first_name = name[0];
    var last_name = name[1];
    var major = req.body.major;
    var grade = req.body.grade;
    var hometown = req.body.hometown;

    client.query('UPDATE users SET first_name = $1, last_name = $2, major = $3, grade = $4, hometown = $5 WHERE user_id = $6', [first_name, last_name, major, grade, hometown, req.user.user_id], function(err, result) {
      if (err){
        return err;
      } else {
        req.user.first_name = first_name;
        req.user.last_name = last_name;
        client.end();
      }
    });
    res.redirect('/profile');

  }
);

app.post('/home/checkin', function(req, res) {
  var conString = process.env.DATABASE_URL;
  var client = new pg.Client(conString);
  // var client = new pg.Client({
  //   user: 'harrisonayan',
  //   host: 'localhost',
  //   database: 'tap-study',
  //   password: 'harrison',
  //   port: 5432,
  // });
  var location = req.body.locations;
  var subject = req.body.subjects;
  var user = req.user.user_id;
  var user_id = [];
  user_id.push(user);
  var id = 0;
  if(location == 'Benson')
    id = 1;
  if(location == 'CASE')
    id = 2;
  if(location == 'Engineering')
    id = 3;
  if(location == 'Gemmill')
    id = 4;
  if(location == 'KoelBel')
    id = 5;
  if(location == 'Norlin')
    id = 6;
  if(location == 'Wise')
    id = 7;

  client.connect();
  console.log('get');
  Locations.getGroupId(subject, id, function(currentGroup, group_id) {
    console.log('ss');
    if(currentGroup == true){

      client.query('UPDATE groups SET members = members || $1 WHERE group_id = $2',[id,group_id], function(err, result) {
        if(err){
          return err;
          console.log(err);
        } else {
          client.end();
          res.redirect('/home');
        }
      });
    }
    else {
      console.log(user_id,subject,id);
      client.query('INSERT INTO groups(members,subject, location) VALUES($1,$2, $3)',[user_id,subject,id], function(err, result) {
        if(err){
          return err;
          console.log(err);
        } else{
          client.end();
          console.log('y');
          res.redirect('/home');
        }
      });
    }
  });
  console.log(location);
  console.log(subject);
});

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('is logged in');
    return next();
  }
  console.log('is not logged in');
  res.redirect('/');
}
