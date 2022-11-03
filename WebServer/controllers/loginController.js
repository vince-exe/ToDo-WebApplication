/* database schemas */
const userSchema = require('../schema/userSchema')

const serverConfigs = require('../configs/configs.json')

const utilitiesController = require('./utilitiesController')

exports.handleLogin = async (req, resp) => {
    if ((!req.body.email || !req.body.password) || !utilitiesController.checkEmail(req.body.email, serverConfigs.domainsArray)) {
        return resp.sendStatus(422)
    }
    
    const result = await userSchema.findOne({
        email: req.body.email,
        password: req.body.password
    })

    return (result) ? resp.sendStatus(200) : resp.sendStatus(401)
}