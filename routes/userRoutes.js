const express = require('express');
const { loginController, 
		registerController, 
		authController, 
		recruitController, 
		notifyController, 
		delnotiController,
		getAllDocController,
		appointmentController,
		availabilityController	
	} = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware");
const { get } = require('mongoose');

const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// Recruit || POST
router.post('/recruit', authMiddleware, recruitController);

// Notification || POST
router.post('/notification', authMiddleware, notifyController);

// Delete Notification || POST
router.post('/delnoti', authMiddleware, delnotiController);

//Get all doctors || GET
router.get('/getAllDoctors', authMiddleware, getAllDocController);

//Book appointment || POST
router.post('/appointment', authMiddleware, appointmentController);

//Availability || POST
router.post('/availability', authMiddleware, availabilityController);

module.exports = router;