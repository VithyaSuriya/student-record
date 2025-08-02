const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const authSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String ,required:true} 
})
authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (err) {
    next(err)
  }
})
module.exports = mongoose.model('Auth', authSchema)