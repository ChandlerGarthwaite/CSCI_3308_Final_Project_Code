var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));



app.get('/',function(req,res){
  res.render('pages/register',{
    title: "Register"
  });
});
app.get('/logout',function(req,res){
  res.redirect('/');
});
var a = ['0']
app.get('/Home',function(req,res){
  res.render('pages/homePage',{
    title: "Home",
    benson: a,
    case_: a,
    engineering: a,
    gemmill: a,
    koelbel: a,
    norlin: a,
    wise: a
  });
});

app.get('/Profile',function(req,res){
  res.render('pages/Profile',{
    title: "Profile",
    name: 'Na',
    username: 'Na',
    study_status: "Not currently studying",
    major: 'na',
    year: 'na',
  });
});

app.get('/Login',function(req,res){
  res.render('pages/Login',{
    title: "Login"
  });
});

app.listen(PORT, () => {
  console.log("Listening");
});

app.post('/',function(req,res){
  var name = req.body.return_username;
  var password = req.body.return_password;

  console.log(name+password);
  res.redirect('/Home');
});

app.post('/',function(req,res){
  // var user_firstName = req.body.first_name;
  // var user_lastName = req.body.last_name;
  // var user_email = req.body.email_address;
  // var user_username = req.body.username;
  // var dob = req.body.date_of_birth;
  // var password1 = req.body.password_first;
  // var password2 = req.body.password_confirm;
  // var user_major = req.body.major;
  // var user_year = req.body.year;
  console.log(firstName+lastName); //testing this shit out

  res.redirect('/Home');
});
