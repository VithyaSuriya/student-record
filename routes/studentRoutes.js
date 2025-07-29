const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const {studentSchema,idSchema}=require('../validations/studentValidation')
const validate=require('../middleware/validate')

router.post('/',validate(studentSchema,'body'),studentController.createStudent)
router.get('/',studentController.getAllStudents)
router.get('/:id',validate(idSchema,'params'),studentController.getStudentById)
router.put('/:id',validate(idSchema,'params'),studentController.updateStudent)
router.delete('/:id',validate(idSchema,'params'),studentController.deleteStudent)

module.exports=router
