var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var SuperMarche = new Schema({
	name : String,
	loc: {
		type: [Number],  // [<longitude>, <latitude>]
		index: '2d'      // geospatial index
	},
	items:[{ type: Schema.Types.ObjectId, ref: 'Item' }]
})


module.exports = mongoose.model('SuperMarche', SuperMarche);
