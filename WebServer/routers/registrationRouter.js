const express = require('express')
const router = express.Router()

const registrationController = require('../controllers/registrationController')
const utilitiesController = require('../controllers/utilitiesController')

router.post('/api/registration', registrationController.handleRegistration)

router.get('/api/get-configs', utilitiesController.getServerConfigs)

module.exports = router
