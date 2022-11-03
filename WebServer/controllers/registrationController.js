/* Database Schema */
const userSchema = require('../schema/userSchema')

const serverConfigs = require('../configs/configs.json')

const utilities = require('../utils/utils')

exports.handleRegistration = async (req, resp) => {
    if ((!req.body.email || !req.body.password) || !utilities.Utils.checkEmail(req.body.email, serverConfigs.domainsArray)) {
        return resp.sendStatus(422)
    }
    if ((await userSchema.find({ email: req.body.email })).length != 0) {
        return resp.sendStatus(409)
    }

    try {
        await userSchema.create({
            email: req.body.email,
            password: req.body.password
        })
        return resp.sendStatus(200)
    }
    catch (err) {
        console.error(err)
        resp.sendStatus(500)
    }
}