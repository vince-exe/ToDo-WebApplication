const toDoSchema = require('../schema/todoSchema')

exports.addToDo = async (req, resp) => {
    if (!req.body.email || !req.body.title || !req.body.body) {
        return resp.sendStatus(422)
    }

    if ((await toDoSchema.find({ emailCreator: req.body.email, title: req.body.title })).length != 0) {
        return resp.sendStatus(409)
    }

    try {
        await toDoSchema.create({
            emailCreator: req.body.email,
            title: req.body.title,
            body: req.body.body
        })
        return resp.sendStatus(200)
    }
    catch (err) {
        console.error(err)
        resp.sendStatus(500)
    }
}