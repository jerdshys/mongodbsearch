var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var Invitation = new Schema({
	from : String,
	to: String,
	sent : Date,
	message: String
})


module.exports = mongoose.model('Invitation', Invitation);