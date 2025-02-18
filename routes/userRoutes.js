const express = require('express');
const { loginController, registerController, authController, recruitController, notifyController, delnotiController } = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware");

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

module.exports = router;