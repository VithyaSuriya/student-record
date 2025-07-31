const express = require('express')
const mongoose = require('mongoose')
const app = express()
const indexRouter = require('./routes/index')
app.use(express.json())
app.use('/',indexRouter)
require('dotenv').config()
mongoose.connect('mongodb://127.0.0.1:27017/studentrecords', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected ')

  app.listen(5000, () => {
  })

})
.catch(err => {
  console.error('MongoDB connection error ', err)
})