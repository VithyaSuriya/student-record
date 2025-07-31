const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {userSchema, loginSchema}=require('../validations/userValidation')
const validate=require('../middleware/validate')
const verifyToken=require('../middleware/verifyToken')

router.post('/register',validate(userSchema,'body'),userController.registerUser)
router.post('/login',validate(loginSchema,'body'),userController.loginUser)
router.get('/',verifyToken,userController.getAllUsers)
router.put('/:id',verifyToken,validate(userSchema,'body'),userController.updateUser)
router.delete('/:id',verifyToken,userController.deleteUser)

module.exports=router