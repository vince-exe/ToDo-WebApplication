const express = require('express')
const router = express.Router()

const registrationController = require('../controllers/registrationController')
const utilitiesRouters = require('./utilitiesRouters')

router.post('/api/registration', registrationController.handleRegistration)

router.get('/api/get-configs', utilitiesRouters.getServerConfigs)

module.exports = router
