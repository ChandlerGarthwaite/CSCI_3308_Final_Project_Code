var express = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var pgp = require('pg-promise')();


const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'tap-study',
	user: 'harrisonayan',
	password: 'harrison'
};

var db = pgp(dbConfig);


app.use(express.static(__dirname + '/'));



app.get('/',function(req,res){
  res.sendFile(__dirname+'/views/register.html');
});



app.post('/Home/user-submit', (req, res) => {
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email_address;
  var username = req.body.user_name;
  var date_of_birth = req.body.date_of_birth;
  var password = req.body.password_first;

  var insert_statement = "INSERT INTO users_temp(first_name, last_name, email, username, password, date_of_birth) VALUES('" + firstName + "','" +
  lastName + "','" + email + "','" + username + "','" + password + "','" + date_of_birth + "');";

  db.any(insert_statement)
        .then(() => {
        res.sendFile(__dirname+'/views/homePage.html',{
        my_title: "Home Page",
          })
        })
        .catch(error => {
                console.log('error',error);
              })
  });

  app.get('/Home/user-submit',function(req,res){
    res.sendFile(__dirname+'/views/homePage.html');
  });


app.listen(3000, () => {
  console.log('App running on port 3000.')
})
