const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { 
	usersController, 
	doctorsController, 
	accountStatusController, 
	deleteUserController,
	giveAdminController,
	getAllAppointmentsController,
 } = require('../controllers/adminCtrl')

const router = express.Router()

//GET || USERS
router.get('/getAllUsers', authMiddleware, usersController)

//GET || DOCTORS
router.get('/getAllDoctors', authMiddleware, doctorsController)

//POST || ACCOUNT STATUS
router.post('/accountStatus', authMiddleware, accountStatusController)

//POST || DELETE USER
router.post('/deleteUser', authMiddleware, deleteUserController);

//POST || GIVE ADMIN
router.post('/giveAdmin', authMiddleware, giveAdminController);

//GET || ALL APPOINTMENTS
router.get('/getAllAppointments', authMiddleware, getAllAppointmentsController);

module.exports = router