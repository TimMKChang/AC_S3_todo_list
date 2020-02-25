const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

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
  Todo.find()
    .lean()
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(err => {
      return console.error(err)
    })
})
// show all todos
app.get('/todos', (req, res) => {
  return res.redirect('/')
})
// create todo page
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
// get one todo
app.get('/todos/:id', (req, res) => {
  res.send('show one todo')
})
// create todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    name: req.body.name
  })
  todo.save(err => {
    if (err) {
      return console.error(err)
    }
    return res.redirect('/')
  })
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
