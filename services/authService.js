const User = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async ({ username,email, password }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error('User already exists')
  const user = new User({ username,email, password })
  await user.save()
  return { message: 'User registered successfully',user:
    {id:user._id,email:user.email}
   }
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

exports.getAllUsers = async () => {
  return await User.find().select('-password') // don't expose password
}

exports.getUserById = async (id) => {
  const user = await User.findById(id).select('-password')
  if (!user) throw new Error('User not found')
  return user
}

exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password')
  if (!user) throw new Error('User not found')
  return user
}

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new Error('User not found')
}