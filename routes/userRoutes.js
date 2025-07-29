const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {userSchema, loginSchema}=require('../validations/userValidation')
const validate=require('../middleware/validate')

router.post('/register',validate(userSchema,'body'),userController.registerUser)
router.post('/login',validate(loginSchema,'body'),userController.loginUser)
router.get('/',userController.getAllUsers)
router.put('/:id',validate(userSchema,'body'),userController.updateUser)
router.delete('/:id',userController.deleteUser)

module.exports=router
