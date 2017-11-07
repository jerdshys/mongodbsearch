/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  mongoose = require('mongoose'),
  api= require('./routes/api'),
  jade = require('jade'),
  cors = require('cors');

var Schema = mongoose.Schema;



// passportJS


var app = module.exports = express.createServer();
var db = mongoose.connect('mongodb://localhost/testos', function(error){
        if(error) console.log(error);
        console.log("connection successful");
});


// var con = mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
console.log(mongoose.connection.readyState);


mongoose.Promise = global.Promise;

//
// Configuration

app.configure(function(){
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });

  app.use(express.bodyParser());



  //app.use(express.methodOverride());

  //set that all templates are located in `/public` directory
  app.use(express.static(__dirname + '/bower_components'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/web'));

//
//   //app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
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
app.post('/api/item', api.addItem);
app.post('/api/supermarche', api.addSuperMarche);
app.get('/api/search/:search?', api.search);
app.get('/api/search/remote/:search?', api.searchRemote);
// app.get('/api/search/', api.search);


// \(o.o)\ ROUTES /(o.o)/ -------------------------------------------------

// JSON API

// load fixtures

// passportjs
 app.get('/', function (req, res) {
       res.render('index', { user : req.user });
   });
  app.get('/*', function(req, res){
    res.redirect('/');
  });


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);
// Start server

app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
