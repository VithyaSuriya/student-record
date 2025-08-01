const express = require('express')
const router = express.Router()
const authService = require('../services/authService')


router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.registerUser({ email, password })
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginUser({ email, password })
    res.status(200).json({ message: 'Login successful', token: result.token })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

module.exports = router