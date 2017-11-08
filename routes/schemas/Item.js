
var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId
,mongoosastic = require('mongoosastic'),
elasticsearch = require('elasticsearch'),
esClient = new elasticsearch.Client({host: 'localhost:9200'});

var MongooseArray = require('mongoose/lib/types/array');

var ItemSchema = new Schema({
	name: {type:String, es_indexed:true},
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


ItemSchema.plugin(mongoosastic, {
  esClient: esClient
})

var Item = mongoose.model('Item',ItemSchema);


Item.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});

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
