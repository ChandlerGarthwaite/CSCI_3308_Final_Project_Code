
var LocalStrategy = require('passport-local').Strategy;
var pg = require('pg');

//var conString = process.env.DATABASE_URL;
//var client = new pg.Client(conString);

var client = new pg.Client({
  user: 'harrisonayan',
  host: 'localhost',
  database: 'harrisonayan',
  password: 'harrison',
  port: 5432,
});

var User = require('../app/models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log(user.user_id + ' was serialized');
    done(null, user.user_id);
  });

  passport.deserializeUser(function(id, done) {
    console.log(id + " is deserialized");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //register user
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done){
    console.log('signup');
    process.nextTick(function(callback) {
      User.findOne(username, function(err, notAvailable, user) {
        if (err){
          return done(err);
          console.log(err);}
        if (notAvailable == true){
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        }
        else{
          console.log('new local user');

          var user = new User();
          user.first_name = req.body.first_name;
          user.last_name = req.body.last_name;
          user.username = req.body.username;
          user.password = req.body.password;
          user.email = req.body.email;

          user.save(function(newUser) {
            console.log("the object user is : ", newUser);
            passport.authenticate();
            return done(null, newUser);
          });
        }
      });
    });
  }));



  //login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    process.nextTick(function(callback) {
      User.findOne(username, function(err, notAvailable, user) {
        console.log('local-login');
        if (err)
          return done(err);
        if(!notAvailable)
          return done(null, false, req.flash('loginMessage', 'No user found'));
        if(user.password != password)
          return done(null, false, req.flash('loginMessage', 'Wrong Password'));

        return done(null, user);
      });
    });
  }));



};
