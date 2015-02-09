var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//models
var UserInfo = require('./schemas/UserInfo');
var Food = require('./schemas/Food');
var Tag = require('./schemas/Tag');


exports.reload = function(req,res) {

	//var userFood = new Food({ name: "pizza", description : "tres bonne pizza faite maison au feu de bois. La pate est faite maison également. La pizza est garnie de tomates fraiches, basillic et mozarella du fromager.", type : "On Demand",  user : "oligan34",lat :req.body.lat,lng:req.body.lng,tags : req.body.selectedTags,ingredients : req.body.selectedIngredients});
	userFood.remove({}, function(err) { 
   		console.log('collection removed') 
	});

	var userFood = new Food({name : "burger corse", prix : "75", description : "blabla", type : "On demand", user : "oligan34", lat : 49.0353114, lng : 2.0694092, loc : [ 2.0694092, 49.0353114 ], ingredients : [ "farine", "oeufs", "tomates", "beurre" ], tags : [ "ground beef", "tasty", "salé" ]});
	userFood.save(function (err) { });

	

}



