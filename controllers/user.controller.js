const bcrypt = require('bcrypt')
const Session = require('../models/session.model.js')
const User = require('../models/user.model')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
	console.log('heyo from user signup')
	console.log(req.body)

	try {
		const salt = bcrypt.genSaltSync(saltRounds)
		const hash = bcrypt.hashSync(req.body.password, salt)

		const user = new User({
			username: req.body.username,
			password: hash,
		})

		let newUser = await user.save()
		res.send(newUser)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const signIn = async (req, res) => {
	console.log('hello from signIn')
	try {
		let user = await User.findOne({
			username: req.body.username,
		})
		if (!user) throw { message: 'wrong username' }

		let passwordMatch = bcrypt.compareSync(req.body.password, user.password)

		console.log(passwordMatch, req.body.password, user.password)
		if (!passwordMatch) throw { message: 'wrong password, bruh' }

		let token = jwt.sign(
			{
				id: user._id,
				role: 'user',
			},
			process.env.JWT_PASSWORD,
		)

		let session = new Session({
			sessionToken: token,
			expires: new Date().setMonth(new Date().getMonth() + 1),
		})

		await session.save()

		res.header('userauth', token).send(user)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const logOut = async (req, res) => {
	console.log(req.body)
	try {
		let token = await Session.findOne({
			sessionToken: req.body.sessionToken,
		})
		await token.remove()
		res.send({
			message: 'Success',
		})
	} catch (e) {
		console.log(e)
		res.status(400).send({
			message: 'Something went wrong',
		})
	}
}

module.exports = {
	signUp,
	signIn,
	logOut,
}
