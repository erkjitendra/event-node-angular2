var express = require('express');
var router = express.Router();

var cont = require('../controller/controller.js');

// add user or registration
router.post('/addUser', cont.addUser );

router.get('/google', cont.google);

// get user or login
router.get('/login', cont.getUser);

//check login user
router.post('/checkLogin', cont.checkUser);

// add events
router.post('/addEvents', cont.addEvent );

//get events
router.get('/getEvent', cont.getEvent);

// get event for user
router.get('/getEvent/user', cont.getEventForUser);

// logout
router.post('/logout', cont.userLogout);

// add category
router.post('/addCat', cont.addNewCat);

// get category
router.get('/getCategory', cont.getCategory);

//filter event by date
router.post('/filterEvents/date', cont.filterEventByDate);

//filter Booked event by date
router.post('/filterBookedEvents/date', cont.filterBookedEventsByDate);

// delete by Admin
router.post('/delete/event', cont.deleteEvent);

// delete by Admin
router.post('/delete/category', cont.deleteCategory);

// filter by category
router.post('/filterByCategory', cont.filterByCategory);

// update Event data
router.put('/event/update', cont.updateEvent);

//add user via google account
//router.post('/google/user/add', cont.addUserGoogle);

// get user google
router.get('/getGoogleUserAsSignIn', cont.getGoogleUserAsSignIn);

// create account on app via google
router.post('/google/createAccount', cont.googleCreateAccount);

//book event by user
router.put('/bookEvent', cont.bookEvent);

//show booked event to user
router.get('/showBookedEvent', cont.showBookedEvent);

//cancel Event
router.put('/cancelEvent', cont.cancelEvent);

// history of addEvent
router.get('/history', cont.history);

//
router.get('/google/user/check',cont.googleUserCheckDb);

//filterByCategoryUser
router.get('/filterByCategoryUser',cont.filterByCategoryUser);

//history by date 
router.get('/historyAdmin', cont.historyAdmin);

// history with user and event detalis
router.get('/historyAdmin/info',cont.showcompleteDetailsAdmin);

//
router.get('/logoutComplete',cont.logoutComplete);

module.exports = router;
