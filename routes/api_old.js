/*
* Serve JSON to our AngularJS client
*/
// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

var Food = new Schema({
	name: String,
	picture: String
})

module.exports = mongoose.model('Account', Account);


exports.addFood = function (req, res) {
	//data.posts.push(req.body);
	res.json(req.body);
	console.log('server addFood :  '+req.body.nom);
	/*var newFood = new Food({ nom : req.body.nom, photo : req.body.photo });
	newFood.save(function (err) {
  	if (err) {// ...
  		console.log('error while registering new food '+req.body.nom); }
  	else {
  		console.log('food succesfully registered'+req.body.nom);+' '}
  	
	});*/
};


// GET
exports.posts = function (req, res) {
	var posts = [];
	data.posts.forEach(function (post, i) {
		posts.push({
			id: i,
			title: post.title,
			text: post.text.substr(0, 50) + '...'
		});
	});
	res.json({
		posts: posts
	});
};
exports.post = function (req, res) {
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length) {
		res.json({
			post: data.posts[id]
		});
	} else {
		res.json(false);
	}
};

// POST
exports.addUser = function (req, res) {
	//data.posts.push(req.body);
	res.json(req.body);
	console.log('server register '+req.body.login);
	var newUser = new Account({ username : req.body.login, password : req.body.password });
	newUser.save(function (err) {
  	if (err) {// ...
  		console.log('error while registering new user '+req.body.login); }
  	else {
  		console.log('user succesfully registered'+req.body.login);+' '}
  	
	});
};

// PUT
exports.editPost = function (req, res) {
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length) {
		data.posts[id] = req.body;
		res.json(true);
	} else {
		res.json(false);
	}
};
// DELETE
exports.deletePost = function (req, res) {
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length) {
		data.posts.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};