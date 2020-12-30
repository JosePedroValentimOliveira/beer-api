const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
    beer_id:{type:String,required:true},
    quantity:{type:Number,required:true}
    



})
const Stock = mongoose.model('Stock',StockSchema,'Stock');
module.exports = Stock;

