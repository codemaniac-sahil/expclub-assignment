const express = require('express')

const router = express.Router()
const authController = require('../controller/Auth')

router.post('/register', authController.reqister)
router.post('/login', authController.login)
router.post('/logout', authController.logout)



module.exports = router