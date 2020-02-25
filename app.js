const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/AC_S3_todo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

const Todo = require('./models/todo')

// setting routes
app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
