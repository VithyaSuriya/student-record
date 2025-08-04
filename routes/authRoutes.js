const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { registerSchema, loginSchema } = require('../validations/authValidation')
const validate = require('../middleware/validate')
const passport = require('passport')
const validateID = require('../middleware/validateID')
const validateQuery=require('../middleware/ValidateQuery')

// Public routes
router.post('/register', validate(registerSchema, 'body'), authController.register)
router.post('/login', validate(loginSchema, 'body'), authController.login)

// Protected routes
router.get('/', passport.authenticate('jwt', { session: false }), validateQuery,authController.getAllUsers)
router.get('/:id',passport.authenticate('jwt',{session:false}),validateID,authController.getUserById)
router.put('/:id', passport.authenticate('jwt', { session: false }), validate(registerSchema, 'body'), validateID,authController.updateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), validateID,authController.deleteUser)

module.exports = router