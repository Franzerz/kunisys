const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { usersController, doctorsController } = require('../controllers/adminCtrl')

const router = express.Router()

//GET METHOD || USERS
router.get('/getAllUsers', authMiddleware, usersController)

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, doctorsController)

module.exports = router