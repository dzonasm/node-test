const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	todo: {
		type: String,
		required: true,
	},
	done: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
