
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const indexRouter = require('./routes/index')
const passport=require('passport')
 require('dotenv').config()
require('./config/passport')(passport)
app.use(express.json())
app.use('/',indexRouter)
app.use(passport.initialize())



mongoose.connect('mongodb://127.0.0.1:27017/studentrecords', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected ')

  app.listen(3000, () => {
  })

})
.catch(err => {
  console.error('MongoDB connection error ', err)
})
module.exports=app