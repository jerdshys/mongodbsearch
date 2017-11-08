
var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var MongooseArray = require('mongoose/lib/types/array');

var ItemSchema = new Schema({
	name: {type:String},
	prix: String,
	loc: {
        type: { type: String },
        coordinates: [Number],
    }
	// loc: {
  //   	type: [Number],  // [<longitude>, <latitude>]
  //   	index: '2d'      // geospatial index mongoose
  //   }
})

 ItemSchema.index( { loc : "2dsphere" } )




var Item = mongoose.model('Item',ItemSchema);


// ItemSchema.plugin(mongoosastic);




//
// Item.createMapping({
//   "analysis" : {
//     "analyzer":{
//       "content":{
//         "type":"custom",
//         "tokenizer":"whitespace"
//       }
//     }
//   }
// },function(err, mapping){
//   // do neat things here
// });

module.exports = Item;
