module.exports = function(app, passport) {

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
    res.render('pages/homePage.ejs' ,{
      user: req.user,
      title: "Home"
    });
    //console.log(req.user);
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile.ejs' , {
      user: req.user,
      title: "Profile"
    });
    //console.log(req.user);
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
