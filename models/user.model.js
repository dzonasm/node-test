const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password
			},
		},
	},
)

const User = mongoose.model('User', userSchema)

module.exports = User
