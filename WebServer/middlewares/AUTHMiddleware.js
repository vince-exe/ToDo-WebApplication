const userSchema = require('../schema/userSchema')

exports.checkAUTH = async (req, resp, next) => {
    if (!req.body.email) {
        return resp.sendStatus(422)
    }

    const result = await userSchema.findOne({
        email: req.body.email,
    })

    if (!result) {
        return resp.sendStatus(401)
    }
    next()
}
