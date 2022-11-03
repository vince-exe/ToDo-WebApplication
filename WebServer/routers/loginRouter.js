const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
const utilities = require('../utils/utils')

router.post('/api/login', loginController.handleLogin)

router.get('/api/get-configs', utilities.Utils.getServerConfigs)

module.exports = router