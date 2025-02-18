const express = require('express');
const { loginController, registerController, authController, recruitController, notifyController } = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);
module.exports = router;

// Recruit || POST
router.post('/recruit', authMiddleware, recruitController);

// Notification || POST
router.post('/notification', authMiddleware, notifyController);
module.exports = router;