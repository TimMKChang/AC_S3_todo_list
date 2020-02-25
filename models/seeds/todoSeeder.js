const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/AC_S3_todo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  const seedNumber = 10
  for (let i = 0; i < seedNumber; i++) {
    Todo.create({ name: `seed-${i}` })
  }
  console.log('Seed had been created.')
})
