/* Database Schema */
const userSchema = require('../schema/userSchema')

exports.handleRegistration = async (req, resp) => {
    if (!req.body.email || !req.body.password) {
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