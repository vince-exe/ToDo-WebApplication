const express = require('express')
const router = express.Router()

const registrationController = require('../controllers/registrationController')

router.post('/api/registration', registrationController.handleRegistration)

module.exports = router
