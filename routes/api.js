var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
var models = require('./database')(mongoose);
var Food = new models.Food();*/

// lib upload file
var fs = require('fs');
// lib creation de dossier
var mkdirp = require('mkdirp');

var Food = new Schema({
	name: String,
	description : String,
	path: String,
	type: String,
	tags : Array,
	user : String
})

var Tag = new Schema({
	name: String,
	popularity: Number
})

var UserInfo = require('mongoose').model('UserInfo');


//pass model to controller
var Food= mongoose.model('Food', Food);
var Tag= mongoose.model('Tag', Tag);

// PUT
exports.addFood = function (req, res) {

	console.log("ADD FOOD = = = = = = = = ")
	console.log('nom :  '+req.body.nom);
	console.log('description :  '+req.body.description);
	console.log('image :  '+req.body.picture);
	console.log('type :  '+req.body.type);
	console.log('tags :  '+req.body.selectedTags);
	//console.log('files : '+req.body.file.src);

	// enregistrement du user
	var userFood = new Food({ name: req.body.nom, description : req.body.description, type : req.body.type, tags : req.body.selectedTags,user : req.user.username });
	userFood.save(function (err) {
	  (err) ? console.log('erreur save food') : console.log("save food success");
	});

	mkdirp('web/upload/'+req.user.username, function(err) { 
    	// path was created unless there was error
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/'+req.body.nom+'.jpg', buff, function (err) {
   	 		console.log('file save done');
	});

};


// get food from current user
exports.getFood = function (req, res) {
	console.log("\n\nmethod getFood "+req.params.id+"\n\n");
	Food.findOne({ _id : req.params.id }, function (err, foods){
		if(!err)
		{
			console.log(foods);
			console.log("resfood by id \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			foods: foods
		});
  	});
}



// get food pour affichage dans le catalogue
exports.getFoods = function (req, res) {
	console.log("\n\nmethod getFood\n\n");
	Food.find({}, function (err, foods){
		if(!err)
		{
			console.log(foods);
			console.log("resfood \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			foods: foods
		});
  	});
}

// get food from current user
exports.getFoodFromUser = function (req, res) {
	console.log("\n\nmethod getFoodFromUser "+req.user.username+"\n\n");
	Food.find({ user : req.user.username }, function (err, accounts){
		if(!err)
		{
			console.log(accounts);
			console.log("resfood from user \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			foods: accounts
		});
  	});
}


// GET
exports.getTags = function (req, res) {

	var newTag = new Tag({ name: "sushi", popularity : 3 });
	newTag.save(function (err) {
	  (err) ? console.log('erreur save tag') : console.log("save tag success");
	});


	console.log("\n\nmethod getTags\n\n");
	Tag.find({}, function (err, Tag){
		if(!err)
		{
			console.log(Tag);
			console.log("restags \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			Tag: Tag
		});
  	});
}

// get food poue affichage dans le catalogue
exports.getUsers = function (req, res) {
	console.log("\n\nmethod getUsers\n\n");
	UserInfo.find({}, function (err, userinfos){
		if(!err)
		{
			console.log(UserInfo);
			console.log("resuser \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			userinfos: userinfos
		});
  	});
}

