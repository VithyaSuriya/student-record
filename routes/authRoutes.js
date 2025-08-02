const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { registerSchema, loginSchema } = require('../validations/authValidation')
const validate = require('../middleware/validate')
const passport = require('passport')

// Public routes
router.post('/register', validate(registerSchema, 'body'), authController.registerUser)
router.post('/login', validate(loginSchema, 'body'), authController.loginUser)

// Protected routes
router.get('/', passport.authenticate('jwt', { session: false }), authController.getAllUsers)
router.put('/:id', passport.authenticate('jwt', { session: false }), validate(registerSchema, 'body'), authController.updateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), authController.deleteUser)

module.exports = router