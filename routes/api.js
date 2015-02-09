var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// lib upload file
var fs = require('fs');
// lib creation de dossier
var mkdirp = require('mkdirp');

//models
var UserInfo = require('./schemas/UserInfo');
var Food = require('./schemas/Food');
var Tag = require('./schemas/Tag');
var Invitation = require('./schemas/Invitation');
var Message = require('./schemas/Message');




//pass model to controller
// var Food = mongoose.model('Food', Food);
// var Tag = mongoose.model('Tag', Tag);

// -------------------------------------------------------------------------------
// FOOD
// -------------------------------------------------------------------------------


// PUT
exports.addFood = function (req, res) {
	console.log('add food serveur : '+req.body.nom+' '+req.body.selectedTags);
	// enregistrement du user  
	var location = [req.body.lng,req.body.lat];
	
	// tags : req.body.selectedTags,
	var userFood = new Food({ name: req.body.nom, prix : req.body.prix, description : req.body.description, type : req.body.type,  user : req.user.username,lat :req.body.lat,lng:req.body.lng,tags : req.body.selectedTags,ingredients : req.body.selectedIngredients, loc :location, views : 0});
	console.log("OH MY DAYUM===============");
	userFood.save(function (err) {
	  (err) ? console.log('!!!! erreur save food : '+err) : console.log("======================= save food success");
	});

	mkdirp('web/upload/'+req.user.username, function(err) { 
    	// path was created unless there was error
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/'+req.body.nom+'.jpg', buff, function (err) {
   	 		console.log('file save done');
	});

	var tags = req.body.selectedTags;
	console.log("tags in function "+tags);
	for (var i = tags.length - 1; i >= 0; i--) {
		addTag(tags[i]);
	}
};

function addTag(tagToAdd) {
	
	console.log("tags in tags "+tagToAdd);
	console.log("ajout des tags -----------");
	// on parcoure le tableau des tags
	
		
		console.log("dat tag "+tagToAdd);
			Tag.findOne({name: tagToAdd}, function (err, tag) {
				if(tag) {
	  				tag.popularity = tag.popularity+1;
	   				tag.save(function (err) {
					    if(err) {
					        console.error('ERROR!');
					    }
					});
				}
				else {
					console.log("name...."+tagToAdd);
					var tag = new Tag({ name: tagToAdd, popularity : 1});
					tag.save(function (err) {
	  					(err) ? console.log('!!!! erreur save food') : console.log("======================= save food success");
					});
				}
			});
	
}

// get food from current user
exports.getFood = function (req, res) {
	console.log("\n\nmethod getFood "+req.params.id+"\n\n");
	Food.findOne({ _id : req.params.id }, function (err, food){
		if(!err)
		{
			
			food.views = food.views+1;
			
			food.save(function (error) {
        		if(error) {
            		console.error('ERROR!'+error);
        		}
    		});
			console.log(food);
			console.log("resfood by id \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			foods: food
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

// -------------------------------------------------------------------------------
// PROFILE
// -------------------------------------------------------------------------------

// get food from current user
exports.getProfile = function (req, res) {
	console.log("\n\nmethod getUser "+req.user.username+"\n\n");
	UserInfo.findOne({ username : req.user.username }, function (err, userInfos){
		if(!err)
		{
			console.log(userInfos);
			console.log("resfood from user \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			userInfo: userInfos
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

	// var newTag = new Tag({ name: "sushi", popularity : 3 });
	// newTag.save(function (err) {
	//   (err) ? console.log('erreur save tag') : console.log("save tag success");
	// });


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

// get food pour affichage dans le catalogue
exports.getUsers = function (req, res) {
	console.log("\n\nmethod getUsers\n\n");
	UserInfo.find({}, function (err, userinfos){
		if(!err)
		{
			console.log(userinfos);
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


// geolocate user and save onto profile
exports.geolocateUser = function (req, res) {

	UserInfo.findOne({username: req.user.username}, function (err, userInfo) {
   

   	console.log("================");
    console.log(req.body.lat);
    console.log(req.body.lng);

    userInfo.lat = req.body.lat;
    userInfo.lng = req.body.lng;
    userInfo.loc = [req.body.lng,req.body.lat];

    userInfo.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
    });
});
}

//change profile pic of user
exports.profilePic = function (req, res) {

	

	mkdirp('web/upload/'+req.user.username, function(err) { 
    	// path was created unless there was error
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/profilePic.jpg', buff, function (err) {
   	 		console.log('file save done');
	});

};

// geolocate user and save onto profile
exports.editDescription = function (req, res) {

	UserInfo.findOne({username: req.user.username}, function (err, userInfo) {
   

   	console.log("================");
    console.log(req.body.description);
   
    userInfo.description = req.body.description;
   
    userInfo.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
    });
});
}

exports.editGallerie = function(req,res) {
	
	mkdirp('web/upload/'+req.user.username, function(err) { 
    	// path was created unless there was error
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file1.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/pic1.jpg', buff, function (err) {
   	 		console.log('file save done');
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file2.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/pic2.jpg', buff, function (err) {
   	 		console.log('file save done');
	});

	// enregistrement du fichier req.body.file.src dans le dossier web/upload/:user
	var buff = new Buffer(req.body.file3.src.replace(/^data:image\/(png|jpeg);base64,/,''), 'base64');
	fs.writeFile('web/upload/'+req.user.username+'/pic3.jpg', buff, function (err) {
   	 		console.log('file save done');
	});


}

// get food from current user
exports.getUser = function (req, res) {
	console.log("\n\nmethod getFood "+req.params.name+"\n\n");
	UserInfo.findOne({ username : req.params.name }, function (err, userInfos){
		if(!err)
		{
			console.log(userInfos);
			console.log("resfood from user \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			userInfo: userInfos
		});
  	});
}

exports.getLocalFood = function(req, res, next) { 
    var longitude = req.params.lng; 
    var latitude = req.params.lat;

    var limit = 10;
    console.log("GET LOCAL FOOD ==============");
    console.log(longitude+','+latitude);

    // get the max distance or set it to 30 kilometers
    var maxDistance = 500;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = longitude;
    coords[1] = latitude;

    // find a location
    Food.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, foods) {
      if (err) {
        return res.json(500, err);
      }
      console.log("local fooooooods");
      console.log(foods);
      res.json({
			foods: foods
		});
    });
}

// -------------------------------------------------------------------------------
// FRIEND REQUEST
// -------------------------------------------------------------------------------

// send friend request
exports.friendRequest = function(req,res) {
	var dest = req.params.name;
	if(req.user)
	{
		var invitation = new Invitation({ from: req.user.username, 
								   to: dest,
								   sent: new Date(),
								   message: "jerome vous a invité" });
		invitation.save(function (err) {
				(err) ? console.log('!!!! erreur save invitation') : console.log("======================= save invitation success");
		});

	}
}

//accept friend request
exports.friendRequestAccept = function(req,res) {
	var dest = req.params.name;
	if(req.user)
	{
		Invitation.findOneAndRemove({from: req.params.name, to: req.user.username}, function(err){ 
  		
			Invitation.find({to : req.user.username}, function (err, invitations){
				if(!err)
				{
					console.log(invitations);
					console.log("res invit \n");
				}
				else
				{
					throw err;
					console.log("error \n");
				}
				res.json({
					invitations: invitations
				});
			});
		});
	
 	
		// add user as friend : A in B and friend B in A
		UserInfo.findOne({username: req.user.username}, function (err, userInfo) {
    		userInfo.friends.push(req.params.name);
    		userInfo.save(function (err) {
        		if(err) {
            		console.error('ERROR!');
        		}
    		});
    	});
    	UserInfo.findOne({username: req.params.name}, function (err, userInfo) {
    		userInfo.friends.push(req.user.username);
    		userInfo.save(function (err) {
        		if(err) {
            		console.error('ERROR!');
        		}
    		});
    	});

    }


}

//refuse friend request
exports.friendRequestRefuse = function(req,res) {
	var dest = req.params.name;
	if(req.user)
	{
		Invitation.findOneAndRemove({from: req.params.name, to: req.user.username}, function(err){ 
  		
			Invitation.find({to : req.user.username}, function (err, invitations){
				if(!err)
				{
					console.log(invitations);
					console.log("res invit \n");
				}
				else
				{
					throw err;
					console.log("error \n");
				}
				res.json({
					invitations: invitations
				});
			});
		});
	
 	}
}

//get user's friend requests
exports.getFriendRequest = function(req,res) {
	Invitation.find({to : req.user.username}, function (err, invitations){
		if(!err)
		{
			console.log(invitations);
			console.log("res invit \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			invitations: invitations
		});
  	});
}

// -------------------------------------------------------------------------------
// MESSAGES
// -------------------------------------------------------------------------------

exports.message = function(req,res) {
	var message = new Message({ from: req.user.username, to : req.body.to, sent : new Date(), message:req.body.message, read:'false'});
	message.save(function (err) {
	  (err) ? console.log('!!!! erreur save mssage') : console.log("======================= save message success");
	});
}

// get discussion with user X
exports.getMessage = function(req,res) {
	//Message.find({from : req.params.name, to : req.user.username}, function (err, messages){
	Message.find({	 $and: [
         			 	{ $or: [{from: req.params.name}, {from: req.user.username}] },
         			 	{ $or: [{to: req.params.name}, {to: req.user.username}] }	
      				]},
        function (err, messages){
        if(messages){
	        for (var i = messages.length - 1; i >= 0; i--) {
	        	if((messages[i].read==false) && (messages[i].from!=req.user.username))
	        	{
	        		var messageToUpdate = messages[i];
				    messageToUpdate.read = "true";
	   
				    messageToUpdate.save(function (err) {
				        if(err) {
				            console.error('ERROR!');
				        }
				    });

	        	}
	        };
   		}
		if(!err)
		{
			console.log(messages);
			console.log("res messages \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			messages: messages
		});
  	});
}

// get discussion with user X
exports.getUnreadMessage = function(req,res) {
	//Message.find({from : req.params.name, to : req.user.username}, function (err, messages){
	Message.find({ to: req.user.username, read: 'false' }, function (err, messages){
        
		if(!err)
		{
			console.log(messages);
			console.log("res unread messages \n");
		}
		else
		{
			throw err;
			console.log("error \n");
		}
		res.json({
			messages: messages
		});
  	});
}

// -------------------------------------------------------------------------------
// FAVORIS
// -------------------------------------------------------------------------------

exports.addFavorite = function(req,res) {
	UserInfo.findOne({username: req.user.username}, function (err, userInfo) {
   
		var user = req.params.user;
		var food = req.params.food;
		var newFav = {username : user, food : food};

	    userInfo.favorites.push(newFav);

	    userInfo.save(function (err) {
	        if(err) {
	            console.error('ERROR!');
	        }
	    });
	});
}
