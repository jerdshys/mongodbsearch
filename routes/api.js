var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Food = new Schema({
	name: String,
	picture: String
})

var Food= mongoose.model('Food', Food);


// PUT
exports.addFood = function (req, res) {

	console.log('nom :  '+req.body.nom);
	console.log('image :  '+req.body.picture);

	// enregistrement mongoose
	var userFood = new Food({ name: req.body.nom, picture : req.body.picture});
	userFood.save(function (err) {
	  (err) ? console.log('erreur save food') : console.log("save food success");
	});

};

// GET
exports.getFood = function (req, res) {
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


