const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET=process.env.JWT_SECRET

exports.createUser = async (data) => {
    const { username, email, password } = data

    const existing = await User.findOne({ email })
    if (existing) throw new Error('Email already registered')


    const newUser = new User({ username, email, password})
    return await newUser.save()
}

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email })

    console.log("Email entered:", email)
    console.log("User from DB:", user)

    if (!user) throw new Error('Invalid email or password')

    const isMatch = await bcrypt.compare(password, user.password)

    console.log("Password entered:", password)
    console.log("Hashed password from DB:", user.password)
    console.log("Password match result:", isMatch)

    if (!isMatch) throw new Error('Invalid email or password')

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { user, token }
}


exports.getAllUsers = async () => {
    return await User.find()
}

exports.getUserById = async (id) => {
    return await User.findById(id)
}

exports.updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true })
}

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id)
}