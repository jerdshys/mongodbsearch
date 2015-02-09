var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var Favoris = new Schema({
    username : String,
    food: String
});


var UserInfo = new Schema({
    username: String,
    profilePic : String,
    description : String,
    lat : Number, 
    lng : Number,
    loc: {
    	type: [Number],  // [<longitude>, <latitude>]
    	index: '2d'      // geospatial index
    },
    friends : [String],
    favorites: [Favoris]
});

module.exports = mongoose.model('UserInfo', UserInfo);