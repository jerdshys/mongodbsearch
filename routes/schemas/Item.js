var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var MongooseArray = require('mongoose/lib/types/array');

var Item = new Schema({
	name: String,
	prix: String,
	// loc: {
  //   	type: [Number],  // [<longitude>, <latitude>]
  //   	index: '2d'      // geospatial index mongoose
  //   }
})


module.exports = mongoose.model('Item', Item);
