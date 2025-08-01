const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { userSchema, loginSchema } = require('../validations/userValidation')
const validate = require('../middleware/validate')
const passport = require('passport')

// Public Routes
router.post('/register', validate(userSchema, 'body'), userController.registerUser)
router.post('/login', validate(loginSchema, 'body'), userController.loginUser)

// Protected Routes using Passport JWT
router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers)
router.put('/:id', passport.authenticate('jwt', { session: false }), validate(userSchema, 'body'), userController.updateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser) 

module.exports = router