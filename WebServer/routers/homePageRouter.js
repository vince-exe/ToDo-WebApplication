const express = require('express')
const router = express.Router()

const AUTHMiddleware = require('../middlewares/AUTHMiddleware')
const homePageController = require('../controllers/homePageController')

router.route('/').post(AUTHMiddleware.checkAUTH, (req, resp) => { return resp.sendStatus(200) })

router.route('/api/add-todo').post(AUTHMiddleware.checkAUTH, homePageController.addToDo)

module.exports = router