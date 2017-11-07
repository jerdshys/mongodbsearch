var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 mongoosastic = require('mongoosastic'),
 elasticsearch = require('elasticsearch'),
 esClient = new elasticsearch.Client({host: 'localhost:9200'}),
 ObjectId = Schema.ObjectId;

var MongooseArray = require('mongoose/lib/types/array');

var ItemSchema = new Schema({
	name: String,
	prix: String,
	// loc: {
  //   	type: [Number],  // [<longitude>, <latitude>]
  //   	index: '2d'      // geospatial index mongoose
  //   }
})

ItemSchema.plugin(mongoosastic, {
  esClient: esClient,
  log: 'trace'
});

// ItemSchema.plugin(mongoosastic);
var Item = mongoose.model('Item',ItemSchema);





Item.createMapping({
  "analysis" : {
    "analyzer":{
      "content":{
        "type":"custom",
        "tokenizer":"whitespace"
      }
    }
  }
},function(err, mapping){
  // do neat things here
});

module.exports = Item;
