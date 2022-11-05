const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    emailCreator: { type: String, required: true },
    title: {type: String, required: true},
    body: {type: String, required: true}
})

module.exports = mongoose.model('ToDo', todoSchema, 'ToDo')