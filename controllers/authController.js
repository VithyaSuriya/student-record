const authService = require('../services/authService')

exports.register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body)
    res.status(201).json({data:result,message:result.message,error:null})
  } catch (err) {
    res.status(400).json({ data:null,message:null,error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body)
    res.status(200).json({data:result,message:result.message,error:null});
  } catch (err) {
    res.status(401).json({ data:null,message:null,error: err.message })
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers()
    res.json({ data: users })
  } catch (err) {
    next(err)
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.params.id)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await authService.updateUser(req.params.id, req.body)
    res.json({ message: 'User updated', data: updated })
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    await authService.deleteUser(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (err) {
    next(err)
  }
}