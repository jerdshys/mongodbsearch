// var mongoose = require('mongoose')
// , Schema = mongoose.Schema
// , ObjectId = Schema.ObjectId
// , mongoosastic = require('mongoosastic');
// var esClient = new elasticsearch.Client({host: 'localhost:9200'});
//
// var SuperMarche = new Schema({
// 	name : {type:String, es_indexed:true},
// 	loc: {
// 		type: [Number],  // [<longitude>, <latitude>]
// 		index: '2d'      // geospatial index
// 	},
// 	items:[{ type: Schema.Types.ObjectId, ref: 'Item' }]
// })
// SuperMarche.plugin(mongoosastic, {
//   esClient: esClient
// })
// SuperMarche..createMapping(function(err, mapping){
//   if(err){
//     console.log('error creating mapping (you can safely ignore this)');
//     console.log(err);
//   }else{
//     console.log('mapping created!');
//     console.log(mapping);
//   }
// });
// module.exports = mongoose.model('SuperMarche', SuperMarche);
