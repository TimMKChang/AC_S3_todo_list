const express = require('express')
const app = express()
const port = 3000

// setting routes
app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
