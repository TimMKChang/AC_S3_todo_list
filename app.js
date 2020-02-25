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
// homepage
app.get('/', (req, res) => {
  res.send('homepage')
})
// show all todos
app.get('/todos', (req, res) => {
  res.send('show all todos')
})
// get one todo
app.get('/todos/:id', (req, res) => {
  res.send('show one todo')
})
// create todo page
app.get('/todos/new', (req, res) => {
  res.send('create todo page')
})
// create todo
app.post('/todos', (req, res) => {
  res.send('create todo')
})
// update todo page
app.get('/todos/:id/edit', (req, res) => {
  res.send('update todo page')
})
// update todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('update todo')
})
// delete todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('delete todo')
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
