var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-Local-mongoose");
var UserSchema=new mongoose.Schema({
username:String,
password:String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);