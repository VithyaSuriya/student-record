const studentService = require('../services/studentService')

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await studentService.createStudent(req.body)
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(400).json({message:'Failed', error: err.message })
  }
}

// READ ALL
exports.getAllStudents = async (req, res) => {
  try{
    const students=await
    studentService.getAllStudents()
      res.status(200).json(students)
    }catch(error){
      res.status(500).json({message:'Failed',error:err.message})
    } 
};

// READ ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id)
    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }
    res.status(200).json(student)
  } catch (error) {
    res.status(400).json({ error: err.message })
  }
}

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const updateStudent = await studentService.updateStudent(req.params.id, req.body)
    if(!updateStudent){
      return res.status(404).json({message:'Not found'})
    }
    res.status(200).json(updateStudent)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await
    studentService.deleteStudent(req.params.id)
       if(!deleted){
        return res.status(404).json({message:'Not Found'})
       }
      res.status(200).json({message:'Deleted'})
 }catch(error){
  res.status(500).json({message:'Failed',error:error.message})
 }
}

