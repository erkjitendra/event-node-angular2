var userModel = require('../model/userModel');
var eventModel = require('../model/eventModel');
var categoryModel = require("../model/categoryModel");
var bookingModel = require('../model/bookingModel');
var store = require('store');


module.exports.addUser = function(req,resp){

     req.checkBody('email', 'Invalid Email Address ').notEmpty().isEmail();
     req.checkBody('phone', 'Invalid phone number ').notEmpty().isMobilePhone('en-IN');

     console.log();
     var err = req.validationErrors();
        if(err) {
            resp.send(err);
        }else{
            var user = req.body;
    
    if(req.body.Admin){
            var newUser = new userModel({
            fname : user.fname,
            lname : user.lname,
            email : user.email,
            pass  : user.pass,
            phone : user.phone,
            gender : user.gender,
            dob : user.dob,
            admin: user.Admin

        });

    }else{
            var newUser = new userModel({
            fname : user.fname,
            lname : user.lname,
            email : user.email,
            pass  : user.pass,
            phone : user.phone,
            gender : user.gender,
            dob : user.dob

        });
    }

    
    userModel.addUser(newUser,function(err,doc){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(doc);
        }
    });
 }

    
}


module.exports.getUser = function(req, resp) {
    var email = req.query.email;
    var pass = req.query.pass;

    userModel.getUser(email,pass,function(err,data){
        if(err){
            resp.send(err);
        }
        else{
            
            if(data.length == 0){
              var data = {
                  notuser : true
              }
              resp.send(data);
            }else {
                userModel.userUpdate(req.query.email,function(err,result){
                    if(err){
                        resp.send(err);
                    }else{
                        resp.send(result);
                    }
                });
            }
            
           
        }
    });
}



module.exports.checkUser =function(req, resp){
    var id = req.body.id;
    userModel.checkUser(id,function(err,data){
         if(err){
             
            resp.send(err);
        }
        else{
            console.log(">>>",data);
            ch = {
                Active : data.Active
            }
            resp.send(ch);
        }
    });
}

module.exports.userLogout=function(req, resp){
  
    var id = req.body.id;
    userModel.userLogout(id,function(err,data){
         if(err){
             
            resp.send(err);
        }
        else{
            resp.send(data);
           
        }
    });
}

module.exports.logoutComplete = function(req, res) {
    var id = store.get('gid');
    userModel.userLogout(id,function(err,data){
         if(err){
             
            res.send(err);
        }
        else{
            res.redirect('http://localhost:4200');
           
        }
    });
}




module.exports.addEvent = function(req,resp){
    var event = req.body;
    var newEvent = new eventModel({
        Event : event.Event,
        Category : event.Category,
        Location : event.Location,
        Sponsor  : event.Sponsor,
        Date : event.Date,
        Ticket  : event.Ticket,
        T_seats : event.seats,
        F_seats : event.seats,
        B_seats : 0,
        info : event.info

    });

    
    eventModel.addEvent(newEvent,function(err,doc){
        if(err){
            resp.send(err);
        }   
        else{
            resp.send(doc);
            }
        });
    }

    module.exports.getEvent = function(req, resp){
    eventModel.getEvent(function(err,data){
         if(err){
            resp.send(err);
        }
        else{
            resp.send(data);
            }
        });
    }

    module.exports.getEventForUser= function(req, resp){
        var date = req.query.date;
    eventModel.getEventForUser(date,function(err,data){
         if(err){
            resp.send(err);
        }
        else{
            resp.send(data);
            }
        });
    }

module.exports.addNewCat = function(req,resp){
    var cat = req.body;
    var newEvent = new categoryModel({
        categoryname : cat.category_name

    });
         categoryModel.addCat(newEvent,function(err,doc){
            if(err){
                resp.send(err);
            }   
            else{
                resp.send(doc);                
            }
        });
    }

module.exports.getCategory = function(req, resp){
    categoryModel.getCategory(function(err, doc){
         if(err){
                resp.send(err);
            }   
            else{
                resp.send(doc);
            }
    });
}

module.exports.filterEventByDate = function(req,resp){
    var date = req.body.Date;
    eventModel.filterEventByDate(date,function(err, doc){
         if(err){
                resp.send(err);
            }   
            else{
                resp.send(doc);
            }
    });
}

module.exports.filterBookedEventsByDate = function(req,resp){
    var date = req.body.Date;
    var User_id = req.body.user_id;
    bookingModel.filterEventByDate(User_id,date,function(err, doc){
         if(err){
                resp.send(err);
            }   
            else{
                resp.send(doc);
            }
    });
}

module.exports.deleteCategory  = function(req, resp){
    var id = req.body.id;
    categoryModel.delete(id,function(err, doc){
        if(err){
                resp.send(err);
            }   
            else{
                resp.send(doc);
            }
    });        
    

}

module.exports.deleteEvent = function(req, resp){
     var id = req.body.id;
    
    eventModel.delete(id,function(err, doc){
            if(err){
                    resp.send(err);
                }   
                else{
                    resp.send(doc);
                }
        });
}

module.exports.filterByCategory = function(req, resp){
    var Category = req.body.Category;
    eventModel.filterByCategory(Category,function(err,doc){
            if(err){
                    resp.send(err);
                }   
                else{
                    resp.send(doc);
                }
    });
}

module.exports.updateEvent = function(req, resp){
    var si = req.body;
    var id = si.Event_id;
    //var data = JSON.parse(si);
    eventModel.update(id,si,function(err,doc){
            if(err){
                    resp.send(err);
                }   
                else{
                    resp.send(doc);
                }
    });
   
}

    
module.exports.google= function(req, resp){
;

    var newUser = {
        fname : req.user.name.familyName,
        lname : req.user.name.givenName,
        email : req.user.email,
        id  : req.user.id,
        google : true
    };

    store.set('google',JSON.stringify(newUser));
    resp.redirect("http://localhost:4200/google/login");
 
}


module.exports.getGoogleUserAsSignIn = function(req, resp){
  var google = store.get('google');
  google = JSON.parse(google);
  var newData = new userModel({
      fname : google.fname,
      lname : google.lname,
      email : google.email,
      //id : google.id,
      google : google.google,
      Active : true
  });

  userModel.getGoogleUser(newData.email,function(err,data){
        if(!data.length){
            userModel.addUser(newData,function(err,data){
                if(err){
                    resp.send(err);
                }else{
                    store.set('gid',data._id);
                    resp.send(data);
                }
            });
        }
        else{
           userModel.userUpdate(newData.email,function(err,data){
                 if(err){
                    resp.send(err);
                }else{
                     store.set('gid',data._id);
                    resp.send(data);
                }
           });
        }
    });
}

module.exports.googleCreateAccount = function(req,resp){
      var google = store.get('google');
    google = JSON.parse(google);
    var newData = new userModel({
        fname : google.fname,
        lname : google.lname,
        email : google.email,
        pass : req.body.pass,
        dob : req.body.dob,
        gender : req.body.gender
    });

    userModel.addUser(newData,function(err,data){
                 if(err){
                    resp.send(err);
                }else{
                    resp.send(data);
                }
           });
}

module.exports.bookEvent = function(req, resp){

    var B_seats = req.body.B_seats;
    var User_id = req.body.user_id;
    var Event_id = req.body.event._id;
    var Active = true;
    var User_B_Seats ;

eventModel.updateSeats(Event_id,B_seats,function(err,result){
    if(err){
        resp.send(err);
    }else{
        eventModel.findEventWithId(Event_id,function(err,result){
            bookingModel.findBooking(User_id,Event_id,Active,function(err,data1){
                if(err){
                    resp.send(err);
                }else{
                    if(data1.length){
                        var newSeat = parseInt(req.body.B_seats)+parseInt(data1[0].B_seats);
                        bookingModel.updateUserBooking(User_id,Event_id,newSeat,Active,function(err,data2){
                            if(err){
                                resp.send(err);
                            }else{
                              
                                        resp.send(data2);                                       
                                }
                        });
                    }else{
                        var newEvent = new bookingModel({
                            Event_id : Event_id,
                            User_id : User_id,
                            Event : req.body.event.Event,
                            Category : req.body.event.Category,
                            Location : req.body.event.Location,
                            Sponsor : req.body.event.Sponsor,
                            info : req.body.event.info,
                            Date : req.body.date,
                            Ticket : req.body.event.Ticket,
                            B_seats : B_seats,
                            Active : true
                        });
                        bookingModel.BookEvent(newEvent,function(err,data2){
                            if(err){
                                resp.send(err);
                            }else{
                                
                                        resp.send(data2);                                       
                                    
                            }
                        });
                    }
                }
            })
        })
        
}
})
}

module.exports.showBookedEvent = function(req,resp){
    var id = req.query.id;
    var Active = true;
    bookingModel.showBookedEvent(id,Active,function(err,data){
        if(err){
            resp.send(err);
        }else{
            resp.send(data);
        }
    });
}

module.exports.cancelEvent = function(req, resp){
    var _id = req.body._id;
    var Event_id = req.body.Event_id;
    var B_seats = req.body.B_seats;
    var Active = false;

    eventModel.removeBooking(Event_id,B_seats,function(err,result){
        if(err){
            resp.send(err);
        }else{
            bookingModel.removeBooking(_id,Active,function(err, data){
                if(err){
                    resp.send(err);
                }else{
                    resp.send(data);
                }
            });
        }
    })
}
     
module.exports.history = function(req, resp){
    var type = req.query.type;
    var id = req.query.id;

 
        bookingModel.findHistory(id,type,function(err, data){
            if(err){
                resp.send(err);
            }else{
                resp.send(data)
            }
        });
    

        
}

module.exports.filterByCategoryUser = function(req, resp){
    var type = req.query.type;
    var cat = req.query.cat;

        bookingModel.filterByCategoryUser(cat,type,function(err, data){
            if(err){
                resp.send(err);
            }else{
                resp.send(data)
            }
        });
}

module.exports.googleUserCheckDb = function(req, resp){
       var google = store.get('google');
         google = JSON.parse(google);

         userModel.getGoogleUser(google.email,function(err,result){
            if(err){
                resp.json(err);
            }else{
                if(result.length){
                    var warning = {
                        warning : 'user exists'
                    }
                    resp.send(warning);
                }
            }
         });
}

module.exports.historyAdmin = function(req,resp){
    var type = req.query.type;
    var date = req.query.data;

    if(type=='admin'){
        bookingModel.historyByDate(date,function(err,data){
            if(err){
                resp.send(err);
            }else{
                resp.send(data)
            }
        });
    }else{
        bookingModel.filterEventByDate(type,date,function(err,data){
            if(err){
                resp.send(err);
            }else{
                resp.send(data)
            }
        });
    }
}

module.exports.showcompleteDetailsAdmin = function(req,resp){
    var _id = req.query.id;
    var User_id = req.query.User_id;

    bookingModel.findHistoryDetail(_id,function(err,data1){
        if(err){
            resp.send(err);
        }else{
            userModel.checkUser(User_id,function(err,data2){
                  if(err){
                    resp.send(err);
                }else{
                    var result = {
                        data1 : data1,
                        data2 : data2
                    }
                    resp.send(result);
                }
            })
              
            }
        
    });
}

module.exports.onServerStart = function(req,resp){
    userModel.onServerStart(function(err,data){
        console.log("dfsdfsdfsdf",data);
    });
}

