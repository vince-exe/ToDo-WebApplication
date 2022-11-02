/* database schemas */
const userSchema = require('../schema/userSchema')

exports.handleLogin = async (req, resp) => {
    if (!req.body.email || !req.body.password) {
        return resp.sendStatus(422)
    }
    
    const result = await userSchema.findOne({
        email: req.body.email,
        password: req.body.password
    })

    return (result) ? resp.sendStatus(200) : resp.sendStatus(401)
}