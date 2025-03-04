const express = require('express')
const { docInfoController, updateController } = require('../controllers/doctorCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//DOC INFO || POST
router.post('/getDocInfo', authMiddleware, docInfoController)

//UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateController)

module.exports = router