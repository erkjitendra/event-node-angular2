var mongoose = require('mongoose');


var regScheam = mongoose.Schema({
    fname : {type : String, require: true},
    lname : {type : String, require: true},
    email : {type : String, require: true, unique:true, index: true},
    pass  : {type : String},
    gender  : {type : String},
    phone  : {type : Number},
    dob   : {type : String},
    google   : {type : Boolean},
    Active : {type : Boolean, require: true, default:false}
});


var userReg = module.exports = mongoose.model('users',regScheam);

module.exports.addUser = function(newUser,callback){
    newUser.save(callback);
}

module.exports.getUser = function(email,pass,callback){
    userReg.find({email : email , pass : pass},callback);
}
module.exports.getGoogleUser = function(email,callback){
    userReg.find({email :email },callback);
}

module.exports.userUpdate = function(email,callback){
    userReg.findOneAndUpdate({email : email},{$set : {Active : true}},{new : true},callback);
}

module.exports.userLogout = function(id,callback){
    userReg.findByIdAndUpdate({_id : id},{$set : {Active : false}},{new : true},callback);
}

module.exports.checkUser = function(id,callback){
    userReg.find({_id : id},callback);
}

module.exports.userLogout = function(id,callback){
    userReg.findByIdAndUpdate({_id : id},{$set : {Active : false}},{new : true},callback);
}

module.exports.addUserEventBooking = function(id,Event_id,B_seats,callback){
    userReg.update({_id : id},{$push : {Booking :{Event_id,B_seats}}},{new : true},callback);
}

module.exports.checkUser2event = function(id,Event_id,callback){
    userReg.find({_id:id,"Booking.Event_id" : Event_id},callback);
}

module.exports.updateUserEvent = function(id,Event_id,update,callback){
    userReg.update({_id:id,"Booking.Event_id" : Event_id},{$inc: {"Booking.$.B_seats": update}},callback);
}

module.exports.onServerStart = function(callback){
    console.log(">>>>>>>")
    userReg.update({},{$set : {Active : false}},{multi : true},callback);
}
