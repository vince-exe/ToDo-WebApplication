const todoSchema = require('../schema/todoSchema')
const toDoSchema = require('../schema/todoSchema')

exports.getToDoList = async (req, resp) => {
    const result = await toDoSchema.find({
        emailCreator: req.body.email
    })

    resp.status(200).json({ toDoList: result })
}

exports.deleteToDo = async (req, resp) => {
    if (!req.body.title || !req.body.email) {
        return resp.sendStatus(422)
    }

    const result = await todoSchema.findOne({ title: req.body.title, emailCreator: req.body.email })
    if (!result) {
        return resp.sendStatus(404)
    }

    await todoSchema.deleteOne({ title: req.body.title, emailCreator: req.body.email })
    resp.sendStatus(200)
}

exports.updtToDO = async (req, resp) => {
    if (!req.body.title || !req.body.body || !req.body.email || !req.body.newTitle) {
        return resp.sendStatus(422)
    }

    const result = await toDoSchema.findOne({ title: req.body.title, emailCreator: req.body.email })
    if (!result) {
        return resp.sendStatus(404)
    }

    await todoSchema.updateOne(
        {
            title: req.body.title,
            emailCreator: req.body.email
        },
        {
            $set: {
                title: req.body.newTitle,
                emailCreator: req.body.email,
                body: req.body.body
            }
        }
    )
    resp.sendStatus(200)
}  