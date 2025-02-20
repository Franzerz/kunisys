const express = require('express')
const { docInfoController } = require('../controllers/doctorCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//DOC INFO || POST
router.post('/getDocInfo', authMiddleware, docInfoController)

module.exports = router