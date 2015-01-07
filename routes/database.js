var Schema = mongoose.Schema;

var Food = new Schema({
        name: String,
        description : String,
        path: String,
        type: String,
        tags : Array,
        user : String
    })

var Tag = new Schema({
        name: String,
        popularity: Number
    })

    //pass model to controller
    mongoose.model('Food', Food);
    mongoose.model('Tag', Tag);
