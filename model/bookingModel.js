var mongoose = require('mongoose');
var bookingSchema = mongoose.Schema({
        Event_id : {type : String, require: true},
        User_id : {type : String, require: true},
        Event : {type : String, require: true},
        Category : {type : String, require: true},
        Location : {type : String, require: true},
        Sponsor : {type : String, require: true},
        info : {type : String, require: true},
        Date : {type : Number, require: true},
        Ticket : {type : Number, require: true},
        B_seats : {type : Number, require: true},
        Active : {type : Boolean}

});

var bookings = module.exports = mongoose.model('bookings',bookingSchema);

module.exports.findBooking = function(User_id,Event_id,Active,callback){
    bookings.find({User_id:User_id,Event_id:Event_id,Active:Active},callback);
}

module.exports.updateUserBooking = function(User_id,Event_id,B_seats,Active,callback){
    bookings.update({User_id:User_id,Event_id:Event_id,Active:Active},{B_seats : B_seats},callback);
}

module.exports.BookEvent = function(newEvent,callback){
    newEvent.save(callback);
}

module.exports.showBookedEvent = function(id,Active,callback){
    bookings.find({User_id : id, Active : Active},callback);
}

module.exports.removeBooking = function(id,Active,callback){
    bookings.findByIdAndUpdate({_id : id},{Active : Active},callback);
}

module.exports.filterEventByDate  =function(User_id,date,callback){
    bookings.find({User_id : User_id,Date : date},callback);
}
module.exports.findHistory = function(id,type,callback){
    if(type == 'user'){
        bookings.find({User_id : id},{},callback);
    }else{
        bookings.find({},callback);
    }
    
}

module.exports.filterByCategoryUser = function(cat,type,callback){
     if(type == 'booked'){
        bookings.find({Category : cat, Active : true},callback);
    }else{
        bookings.find({Category : cat},callback);
    }
}

module.exports.historyByDate = function(date,callback){
    bookings.find({Date : date},callback);
}

module.exports.findHistoryDetail = function(id,callback){
    bookings.find({_id : id},callback);
}

