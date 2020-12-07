const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email:{type:String,required:true},
  password:{type:String,required:true},
  firstname:{type:String,required:true},
  lastname:{type:String,required:true},
  Stock:{type:Object,required:true,default:{}}

    



})
const User = mongoose.model('User',UserSchema,'Users');
module.exports = User;

