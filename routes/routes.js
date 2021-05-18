const router = require('express').Router()
const authMiddleware = require('../middlewares/authenticate')

const userController = require('../controllers/user.controller')
const todosController = require('../controllers/todos.controller')

router.route('/user/signUp').post(userController.signUp)
router.route('/user/signIn').post(userController.signIn)
router.route('/user/logout').delete(authMiddleware.authenticate, userController.logOut)

router
	.route('/todos')
	.post(authMiddleware.authenticate, todosController.createTodo)
	.get(authMiddleware.authenticate, todosController.getUserTodos)
	.delete(authMiddleware.authenticate, todosController.deleteTodo)
	.patch(authMiddleware.authenticate, todosController.updateTodo)

router.route('/test').get((req, res) => {
	try {
		res.send('hello from your backend, m8')
	} catch (e) {
		console.log(e)
	}
})

module.exports = router
