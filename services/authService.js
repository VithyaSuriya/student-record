const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error('User already exists')
  const user = new User({ email, password })
  await user.save()
  return { message: 'User registered successfully' }
}

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid password')

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })

  return { token }
}