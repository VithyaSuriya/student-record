const express = require('express')
const mongoose = require('mongoose')
const app = express();
const studentRouter = require('./routes/studentRoutes')
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected ')

  app.listen(3000, () => {
  });

  app.use('/student', studentRouter)
})
.catch(err => {
  console.error('MongoDB connection error ', err)
});