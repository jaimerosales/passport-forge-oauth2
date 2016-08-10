var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')
  , partials = require('express-partials')
  , ForgeOauth2 = require('forge-oauth2')
  , _adskForgeStrategy = require('../../lib/passport-forge-oauth2/Strategy');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete 500px profile is
//   serialized and deserialized.

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var ADSK_FORGE_CLIENT_ID = "SdeGOaipH6SotGj3Ww307fZwLh2hLnW3"
  , ADSK_FORGE_CLIENT_SECRET = "tuCdWxVVpGBugiEE"
  , ADSK_FORGE_CALLBACK_URL = "http://localhost:3000/oauth";

var options =
  {
    'clientID': ADSK_FORGE_CLIENT_ID,
    'clientSecret': ADSK_FORGE_CLIENT_SECRET,
    'callbackURL': ADSK_FORGE_CALLBACK_URL,
    'tokenURL': ''
  };

// Use the _AdskForgeStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and profile), and
//   invoke a callback with a user object.

passport.use(new _adskForgeStrategy(options, function (token, tokenSecret, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}));

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());

// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(methodOverride());
// Initalize session with approprite params or it will fail!
app.use(passport.initialize());

// Initalize session with approprite params or it will fail!
app.use(session({
  secret: 'shhhh, very secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /login-forge
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Autodesk Forge authentication will involve redirecting
//   the user to login for AutodeskID.  After authorization, Autodesk Forge will redirect the user
//   back to this application at /oauth/callback

app.get('/login-forge', 
  passport.authenticate('adskForge'), 
  function (req, res) {
    console.log("'/login-forge authenticate"); 
    // Redirects, wont be called
});

/// The passport Forge strategy 
app.get('/oauth',
  passport.authenticate('adskForge', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('Inside of Callback');
    var temp = req.session.passport;
    req.session.regenerate(function (err) {
      req.session.passport = temp; // restore passport
      req.session.isAuthenticated = true;
      res.redirect('/');
    });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/logout', function (req, res) {
  req.session.destroy(function () {
    console.log('Inside of the POST Logout');
    res.redirect('/login');
  });
});

app.listen(3000);
console.log('Listen in port 3000');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


