const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { usersController, doctorsController, accountStatusController } = require('../controllers/adminCtrl')

const router = express.Router()

//GET || USERS
router.get('/getAllUsers', authMiddleware, usersController)

//GET || DOCTORS
router.get('/getAllDoctors', authMiddleware, doctorsController)

//POST ACCOUNT STATUS
router.post('/accountStatus', authMiddleware, accountStatusController)

module.exports = router