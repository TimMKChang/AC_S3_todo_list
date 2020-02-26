const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// show all todos
router.get('/', (req, res) => {
  return res.redirect('/')
})
// create todo page
router.get('/new', (req, res) => {
  return res.render('new')
})
// get one todo
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router
