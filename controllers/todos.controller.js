const Todo = require('../models/todo.model')

const createTodo = async (req, res) => {
	try {
		console.log(req.user)

		const todo = new Todo({
			userId: req.user._id,
			todo: req.body.todo,
			done: req.body.done,
		})
		let savedTodo = await todo.save()

		res.send(savedTodo)
		console.log(savedTodo)
	} catch (e) {
		console.log(e)
		res.status(418).send(e)
	}
}

const getUserTodos = async (req, res) => {
	try {
		let todos = await Todo.find({ userId: req.user._id })
		res.send(todos)
	} catch (e) {
		console.log(e)
		res.status(418).send('sowwy, couldnt get your todos')
	}
}

const deleteTodo = async (req, res) => {
	try {
		const todo = await Todo.findOne({ _id: req.body.id })
		await todo.remove()
		res.send('deleted todo')
	} catch (e) {
		console.log(e)
		res.send(e)
	}
}

const updateTodo = async (req, res) => {
	try {
		await Todo.findByIdAndUpdate(req.body.id, { $set: { done: true } }, { new: true })
		res.send('updated todo')
	} catch (e) {
		console.log(e)
		res.status(418).send('couldnt update')
	}
}

const deleteTodos = () => {
	console.log('viskas bus gerai')
}

module.exports = {
	createTodo,
	getUserTodos,
	deleteTodo,
	updateTodo,
}
