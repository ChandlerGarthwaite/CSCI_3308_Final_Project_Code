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

var db = require('./config/db');

db.query('SELECT NOW()', null, (err, res) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  console.log(res.rows[0]);
})


// CONFIGURATION =====================================

app.use(express.static(__dirname + '/'));
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
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
