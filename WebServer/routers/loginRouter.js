const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
const utilitiesController = require('../controllers/utilitiesController')

router.post('/api/login', loginController.handleLogin)

router.get('/api/get-configs', utilitiesController.getServerConfigs)

module.exports = router