// SET UP =========================================

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');
var pg = require('pg');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Database =======================================

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

client.connect(function(err) {
   if(err) {
       return console.error('could not connect to postgres', err);
   }
   client.query('SELECT NOW() AS "theTime"', function(err, result) {
       if(err) {
           return console.error('error running query', err);
       }
       console.log(result.rows[0].theTime);
   });
});



// CONFIGURATION =====================================


require('./config/passport')(passport);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/'));
app.use(session({ secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// ROUTES ============================================
require('./app/routes.js')(app, passport);


// LAUNCH ============================================
//
app.listen(port, () => {
  console.log("Listening on port " + port);
});
