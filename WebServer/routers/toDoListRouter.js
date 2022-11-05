const express = require('express')
const router = express.Router()

const toDoListController = require('../controllers/toDoListController')
const AUTHMiddleware = require('../middlewares/AUTHMiddleware')

router.route('/').post(AUTHMiddleware.checkAUTH, (req, resp) => { return resp.sendStatus(200) })

router.route('/api/get-todo').post(AUTHMiddleware.checkAUTH, toDoListController.getToDoList)

module.exports = router