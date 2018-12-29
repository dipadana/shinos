const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shinos')

const db = mongoose.connection
db.on('error', err => {
  console.error(err)
})
db.once('open', () => {
  console.log('Hooray! We\'re CONNECTED')
})

const app = express()

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// set static files
app.use(express.static(path.join(__dirname, 'public')))

// redirect to admin page
app.get('/', (req, res) => {
  res.redirect('/admin/menus')
})

// home-admin route
const menus = require('./routes/menus')
app.use('/admin/menus', menus)

// running the server
app.listen(3000, () => {
  console.log('Listening on port 3000...')
})