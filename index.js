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

app.get('/Home',function(req,res){
  res.render('pages/homePage',{
    title: "Home"
  });
});

app.get('/Profile',function(req,res){
  res.render('pages/Profile',{
    title: "Profile"
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
