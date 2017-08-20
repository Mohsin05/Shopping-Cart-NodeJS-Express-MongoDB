var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var schema =mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

});

module.exports=mongoose.model('UserLogin',schema);
//userlogin is the name of the schema