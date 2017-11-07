var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    http = require('http');



//models
var SuperMarche = require('./schemas/SuperMarche');
var Item = require('./schemas/Item');





//pass model to controller
// var Food = mongoose.model('Food', Food);
// var Tag = mongoose.model('Tag', Tag);

// -------------------------------------------------------------------------------
// FOOD
// -------------------------------------------------------------------------------


// PUT
exports.addFood = function (req, res) {
	console.log('add food serveur : '+req.body.nom+' ');
	// enregistrement du user
	var location = [req.body.lng,req.body.lat];

	// tags : req.body.selectedTags,


  var nutella= new Item({name:'Nutella', prix: 3.82});
  var crepe= new Item({name:'crepe', prix: 5.00});
  var newSuperMarche = new SuperMarche({name:'SuperSuper',  loc: [49.038074,2.081550], items : [nutella._id]});

  var sucre= new Item({name:'Sucre', prix: 2});
  var fraise= new Item({name:'Fraise', prix: 20.00});
  var superMHJM = new SuperMarche({name:'SuperMHJM',  loc: [50.038074,2.081550], items : [fraise._id,nutella._id,sucre._id]});
}

exports.addItem = function (req, res) {
  console.log('REQ.BODY', req.body)
    console.log("add item")
    var r = res;
     var item = new Item({name : req.body.name, prix : req.body.prix});
     console.log('ITEM', item)
     item.save(function (err,item) {
        console.log('---------------------------item', item);
        if(err) { console.log('err', err) } else {
          console.log("---------------------------no error");
          r.json({
            item: item
          });
        }
      });
}


exports.addSuperMarche = function (req, res) {
  var r =res;
  console.log('add SuperMarche serveur : '+req.body.nom+' ');
  var location = [req.body.lng,req.body.lat];
  var supermarche = new SuperMarche({name:req.body.name ,  loc: location});
  supermarche.save(function (err,supermarche) {
    console.log('supermarche', supermarche)
    if(err) { console.log('err', err) } else {
      r.json({
        supermarche: supermarche
      });
    }
  });
}

exports.search = function(req,res) {
    var tab = [];
    SuperMarche.find({ name : new RegExp(req.params.search, 'i')}).limit(15).exec( function(err, supermarches) {
      if(err) {
        throw err;
      } else {

        Item.find({name :  new RegExp(req.params.search, 'i')}).limit(15).exec( function(err,items) {
          if(err) {
            throw err;
          } else {
            var tab = supermarches.concat(items);
            res.json({
              tab : tab
            });
          }
      });
    }
    });
}

exports.searchRemote = function(req,res) {
  var r = res;
  http.get({
    hostname: 'localhost',
    port : 9200,
    path: '/test/items/AV-WoEIu5uQttXAtyJVO',
  }, (res) => {
    let data ='';
    res.on('data', (chunk) => {
      data += chunk;
        });
    res.on('end', () => {
        console.log(JSON.parse(data)._source);
        r.json({
          tab : JSON.parse(data)._source
        });
      });

    // Do stuff with response
  });
}
