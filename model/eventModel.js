var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    Event : {type : String, require: true},
    Category : {type : String, require: true},
    Location : {type : String, require: true},
    Sponsor : {type : String, require: true},
    info : {type : String, require: true},
    Date : {type : Number, require: true},
    Ticket : {type : Number, require: true},
    T_seats : {type : Number, require: true},
    B_seats : {type : Number, require: true},
    F_seats : {type : Number, require: true}
});

var events = module.exports = mongoose.model('events',eventSchema);

module.exports.addEvent = function(newEvent,callback){
    newEvent.save(callback);
}

module.exports.getEvent = function(callback){
    events.find({},callback);
}

module.exports.getEventForUser = function(date,callback){
    events.find({Date : {$gte : date }},callback);
}

module.exports.filterEventByDate  =function(date,callback){
    events.find({Date : date},callback);
}

module.exports.delete = function(id,callback){
    events.remove({_id : id},callback);
}

module.exports.filterByCategory = function(Category,callback){
    events.find({Category : Category},callback);
}

module.exports.updateEvent = function(newData,callback){
    events.update({_id : id},{$set : {
        Event : newData.Event,
        Category : newData.Category,
        Location : newData.Location,
        Sponsor : newData.Sponsor,
        info : newData.info,
        Date : newData.Date,
        Ticket : newData.Ticket,
        T_seats : newData.T_seats,
        B_seats : newData.B_seats,
        F_seats : newData.F_seats
    }},callback);
}

module.exports.updateSeats = function(Event_id,B_seats,callback){
    events.find({_id : Event_id},function(err,data){
        var NB_seats = parseInt(data[0].B_seats) + parseInt(B_seats);
        var NF_seats = parseInt(data[0].F_seats) - parseInt(B_seats); 
        events.update({_id : Event_id},{B_seats : NB_seats, F_seats : NF_seats},callback);
    });
    
}

module.exports.findEventWithId  = function(Event_id,callback){
    events.findById({_id : Event_id},callback);
}

module.exports.removeBooking = function(Event_id,B_seats,callback){
        events.find({_id : Event_id},function(err,data){
        var NB_seats = parseInt(data[0].B_seats) - parseInt(B_seats);
        var NF_seats = parseInt(data[0].F_seats) + parseInt(B_seats); 
        events.update({_id : Event_id},{B_seats : NB_seats, F_seats : NF_seats},callback);
    });
}