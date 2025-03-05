const express = require('express')
const { 
	docInfoController, 
	updateController, 
	docByIdController,
	docAppointmentController,
	updateStatsController
} = require('../controllers/doctorCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//DOC INFO || POST
router.post('/getDocInfo', authMiddleware, docInfoController)

//UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateController)

//GET ONE DOCTOR || POST
router.post('/getDoctorbyId', authMiddleware, docByIdController)

//GET APPOINTMENTS || GET
router.get('/docAppointment', authMiddleware, docAppointmentController)

//UPDATE STATUS || POST
router.post('/updateStatus', authMiddleware, updateStatsController)

module.exports = router