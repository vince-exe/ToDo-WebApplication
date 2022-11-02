const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
const utilitiesRouters = require('./utilitiesRouters')

router.post('/api/login', loginController.handleLogin)

router.get('/api/get-configs', utilitiesRouters.getServerConfigs)

module.exports = router