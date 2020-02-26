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
    .sort({ name: 'asc' })
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
  Todo.findById(req.params.id)
    .lean()
    .then(todo => {
      return res.render('detail', { todo })
    })
    .catch(err => {
      return console.error(err)
    })
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
  Todo.findById(req.params.id)
    .lean()
    .then(todo => {
      return res.render('edit', { todo })
    })
    .catch(err => {
      return console.error(err)
    })
})
// update todo
app.post('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.name = req.body.name

      if (req.body.done === 'on') {
        todo.done = true
      } else {
        todo.done = false
      }

      todo.save(err => {
        if (err) {
          return console.error(err)
        }
        return res.redirect(`/todos/${req.params.id}`)
      })
    })
    .catch(err => {
      return console.error(err)
    })
})
// delete todo
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.remove(err => {
        if (err) {
          return console.error(err)
        }
        res.redirect('/')
      })
    })
    .catch(err => {
      return console.error(err)
    })
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
