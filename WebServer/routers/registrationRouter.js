const express = require('express')
const router = express.Router()

const registrationController = require('../controllers/registrationController')
const utilities = require('../utils/utils')

router.post('/api/registration', registrationController.handleRegistration)

router.get('/api/get-configs', utilities.Utils.getServerConfigs)

module.exports = router
