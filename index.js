var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

//database stuff
var pgp = require('pg-promise')(); //tells us that we require a package "include in cpp"
const dataConfig = {
  host:'ec2-23-21-129-125.compute-1.amazonaws.com',
  port:5432,
  database:'dascpeq1f0kbsn',
  user:'jnmadpypccwlav',
  password:'7d02bf39afeb7eb08f38c0c923a67509390fcf0c1e945a9e4b55733025df0ed0',
  ssl:true
};
var db = pgp(dataConfig);


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
    name: user_firstName+user_lastName,
    username: user_username,
    study_status: "Not currently studying",
    major: user_major,
    year: user_year,
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

app.post('/registerPost',function(req,res){
  var user_firstName = req.body.first_name;
  var user_lastName = req.body.last_name;
  var user_email = req.body.email_address;
  var user_username = req.body.username;
  var password1 = req.body.password_first;
  var password2 = req.body.password_confirm;
  var user_major = req.body.major;
  var user_year = req;
  console.log(firstName+lastName); //testing this shit out

  var selectStatement = "SELECT * FROM users WHERE username = '"+user_username+"';"; //checks if the user already exists
  var insertStatement = "INSERT INTO users(first_name, last_name, username, password, email, major, grade)"
  +" VALUES ('"+user_firstName+"','"+user_lastName+"','"+user_username+"','"+password1+"','"+user_email+"','"+user_major+"','"+user_year+"');";
  db.task('put-user',task =>{
    return task.batch([
      task.any(selectStatement)
    ]);
    .then(info => {
      if(!info[0]){
        db.task('put-user',task =>{
          return task.batch([
            task.any(selectStatement)
          ]);
          .then(somethingElse =>{
            console.log("MOTHAFUCKA REGISTERED");
          })
        }
      }
    })
  })
  res.redirect('/Home');
});
