const express = require('express')
const router = express.Router()

const toDoListController = require('../controllers/toDoListController')
const AUTHMiddleware = require('../middlewares/AUTHMiddleware')

router.route('/').post(AUTHMiddleware.checkAUTH, (req, resp) => { resp.sendStatus(200) })

router.route('/api/get-todo').post(AUTHMiddleware.checkAUTH, toDoListController.getToDoList)

router.route('/api/delete-todo').post(AUTHMiddleware.checkAUTH, toDoListController.deleteToDo)

module.exports = router
