const mongoose = require('mongoose');
const BeerSchema = new mongoose.Schema({
    beer_name:{type:String,required:true},
    beer_img:{type:String,required:true},
    beer_type:{type:Array,required:true},
    beer_percentage:{type:String,required:true}

})
const Beer = mongoose.model('Beer',BeerSchema,'Beers');
module.exports = Beer;