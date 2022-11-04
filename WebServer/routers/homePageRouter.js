const express = require('express')
const router = express.Router()

const homePageMiddleware = require('../middlewares/homePageMiddleware')

router.route('/').post(homePageMiddleware.checkAUTH, (req, resp) => {
    return resp.sendStatus(200)
})

module.exports = router