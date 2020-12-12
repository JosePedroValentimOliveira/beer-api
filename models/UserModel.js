const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  stock:{type:Object,default:{}}

    



})
const User = mongoose.model('User',UserSchema,'Users');
module.exports = User;

