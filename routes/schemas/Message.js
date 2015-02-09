var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var Message = new Schema({
	from : String,
	to: [String],
	sent : Date,
	message: String,
	read : Boolean
})


module.exports = mongoose.model('Message', Message);