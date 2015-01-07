/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  socket = require('./routes/socket'),
  api = require('./routes/api'),
  apiUser = require('./routes/apiUser'),
  mongoose = require('mongoose'),
  http = require('http'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  multipart = require('connect-multiparty'),
  passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
// require('./routes/database').make(Schema, mongoose);


// var Account = new models.Account();
var Account = new Schema({
    username: String,
    password: String
    
});

var UserInfo = new Schema({
    username: String,
    profilePic : String,
    description : String
});


Account.plugin(passportLocalMongoose);
Account=mongoose.model('Account', Account);
UserInfo= mongoose.model('UserInfo', UserInfo);
//passport
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
//mongoose.connect('mongodb://localhost/passport_local_mongoose');


mongoose.connect('mongodb://localhost/foodr');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose success");
});





var app = module.exports = express.createServer();

// Hook Socket.io into Express
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){

  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  
  app.use(express.bodyParser());

  app.use(multipart({
    uploadDir: "/web"
  }));


  //app.use(express.methodOverride());

  //set that all templates are located in `/public` directory
  app.use(express.static(__dirname + '/bower_components'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/web'));
  

  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/partials/:name', routes.partials);


// \(o.o)\ ROUTES /(o.o)/ -------------------------------------------------

// JSON API

app.post('/api/post', api.addFood);
app.get('/api/get', api.getFoods);

app.get('/api/user/put', apiUser.putUser)
app.get('/api/user/get', apiUser.getUser)

app.get('/api/get/food/user', api.getFoodFromUser);
app.get('/api/get/food/:id',api.getFood)


app.get('/api/getTags', api.getTags);
app.post('/api/postFile',api.postFile);
app.get('/api/getUsers',api.getUsers);


// passportjs 
 app.get('/', function (req, res) {
       res.render('index', { user : req.user });
   });
 app.get('/register', function (req, res) { 
      res.render('index', { user : req.user });
   });
 app.get('/login', function (req, res) { 
      res.render('index', { user : req.user });
   });
  app.get('/logout', function(req, res){
      req.session.destroy();
      res.render('index', { user : '' });
  });

  app.post('/register', function(req, res) {
     var newUser = new UserInfo({ username : req.body.username , description: "", profilePic : "" });
      newUser.save(function (err) {
        (err) ? console.log('erreur save user infos') : console.log("save user infos success");
    });

    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        console.log("register user passport");
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });

  });

  app.get('/*', function(req, res){ 
    res.redirect('/');
  });
    
  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

console.log("passport.js launched");
// Socket.io Communication

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

io.sockets.on('connection', socket);

// Start server

app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

