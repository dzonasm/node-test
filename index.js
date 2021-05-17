require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todoDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const app = express()
const port = 3000

const router = require('./routes/routes')
const db = mongoose.connection
app.use(express.json())

app.use('/api', router)

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('Logged into database'))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`My todo app is listening at http://localhost:${port}`)
})
