const express = require('express')
const router = express.Router()

const homePageMiddleware = require('../middlewares/homePageMiddleware')
const homePageController = require('../controllers/homePageController')

router.route('/').post(homePageMiddleware.checkAUTH, (req, resp) => { return resp.sendStatus(200) })

router.route('/api/add-todo').post(homePageMiddleware.checkAUTH, homePageController.addToDo)

module.exports = router