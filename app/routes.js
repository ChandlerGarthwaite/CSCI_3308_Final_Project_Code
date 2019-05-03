var Locations = require('./locations');
const db = require('../config/db');
module.exports = function(app, passport) {

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


  app.get('/profile', isLoggedIn, function(req, res) {

    var name = req.user.first_name + ' ' + req.user.last_name;
    db.query('SELECT * FROM users WHERE user_id=$1', [req.user.user_id], function(err, result) {
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
            study_status = 'Studying at' + req.user.studyLocation;
          if (major == null)
            major = 'N.A.';
          if( grade == null)
            grade = 'N.A.';
          if(hometown == null)
            hometown = 'N.A.';
          res.render('pages/Profile.ejs' , {
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
  });

  app.post('/profile/edit', function(req, res) {
    var name = req.body.name.split(" ");
    var first_name = name[0];
    var last_name = name[1];
    var major = req.body.major;
    var grade = req.body.grade;
    var hometown = req.body.hometown;

    db.query('UPDATE users SET first_name = $1, last_name = $2, major = $3, grade = $4, hometown = $5 WHERE user_id = $6', [first_name, last_name, major, grade, hometown, req.user.user_id], function(err, result) {
      if (err){
        return err;
      } else {
        req.user.first_name = first_name;
        req.user.last_name = last_name;
      }
    });
    res.redirect('/profile');

  }
  );

  app.post('/home/checkin', function(req, res) {
    var location = req.body.locations;
    var subject = req.body.subjects;
    var user = req.user.user_id;
    var userArray = [];
    userArray.push(user);
    var id = 0;
    if(location == 'Benson'){
      id = 1;
      req.user.studyLocation = "Benson Earth Sciences";
    }
    if(location == 'CASE'){
      id = 2;
      req.user.studyLocation = "CASE Building";
    }
    if(location == 'Engineering '){
      id = 3;
      req.user.studyLocation = "Engineering Center";
    }
    if(location == 'Gemmill'){
      id = 4;
      req.user.studyLocation = "Gemmill Math Library";
    }
    if(location == 'KoelBel'){
      id = 5;
      req.user.studyLocation = "KoelBel Business Library";
    }
    if(location == 'Norlin'){
      id = 6;
      req.user.studyLocation = "Norlin Library";
    }
    if(location == 'Wise'){
      id = 7;
      req.user.studyLocation = "Wise Law Library"
    }
    console.log('get');
    Locations.getGroupId(subject, id, function(currentGroup, group_id) {
      console.log('ss');
      console.log('group:' ,group_id);

      if(currentGroup == true){

        db.query('UPDATE groups SET members = members || ' + "'{"+id+"}'" + ' WHERE group_id = $1',[group_id], function(err, result) {
          if(err){
            console.log(err);
            return err;

          } else {
            res.redirect('/home');
          }
        });
      }
      else {
        db.query('INSERT INTO groups(members,subject, location) VALUES($1,$2, $3)',[userArray,subject,id], function(err, result) {
          if(err){
            return err;
            console.log(err);
          } else{
            res.redirect('/home');
          }
        });
      }
    });
  });

  app.get('/logout', function(req, res) {
    var user = req.user.user_id;
    var studyloc = req.user.studyLocation;
    var studysub = req.user.studySubject;

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
