const toDoSchema = require('../schema/todoSchema')

exports.getToDoList = async (req, resp) => {
    const result = await toDoSchema.find({
        emailCreator: req.body.email
    })

   resp.status(200).json({toDoList: result})
}