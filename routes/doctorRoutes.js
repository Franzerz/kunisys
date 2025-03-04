const express = require('express')
const { docInfoController, updateController, docByIdController } = require('../controllers/doctorCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//DOC INFO || POST
router.post('/getDocInfo', authMiddleware, docInfoController)

//UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateController)

//GET ONE DOCTOR || POST
router.post('/getDoctorbyId', authMiddleware, docByIdController)

module.exports = router