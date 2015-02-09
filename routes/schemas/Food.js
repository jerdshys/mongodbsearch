var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var MongooseArray = require('mongoose/lib/types/array');

var Food = new Schema({
	name: String,
	prix: String,
	description : String,
	path: String,
	type: String,
	tags : [String],
	ingredients : [String],
	user : String,
	lat : Number,
	lng: Number,
	views : Number,
	loc: {
    	type: [Number],  // [<longitude>, <latitude>]
    	index: '2d'      // geospatial index mongoose
    }
})


module.exports = mongoose.model('Food', Food);