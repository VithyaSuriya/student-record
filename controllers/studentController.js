const studentService = require('../services/studentService')

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await studentService.createStudent(req.body)
    res.status(201).json({data:newStudent,message:'Added',error:null})
  } catch (err) {
    res.status(400).json({data:null,message:'Failed', error: err.message })
  }
}

// READ ALL
exports.getAllStudents = async (req, res) => {
  try{
    const students=await
    studentService.getAllStudents()
      res.status(200).json({data:students,message:'Fetched',error:null})
    }catch(error){
      res.status(500).json({data:null,message:'Failed',error:err.message})
    } 
};

// READ ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id)
    if (!student) {
      return res.status(404).json({ data:null,message:'Student Not Found',error: 'Student not found' })
    }
    res.status(200).json({data:student,message:'Fetched by ID',error:null})
  } catch (err) {
    res.status(500).json({ data:null,message:'Failed',error:err.message})
  }
}

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const updateStudent = await studentService.updateStudent(req.params.id, req.body)
    if(!updateStudent){
      return res.status(404).json({data:null,message:'ID Not found',eror:'not found'})
    }
    res.status(200).json({data:updateStudent,message:'Updated',error:null})
  } catch (err) {
    res.status(500).json({  data:null,message:'Failed',error:err.message})
  }
}

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await
    studentService.deleteStudent(req.params.id)
       if(!deleted){
        return res.status(404).json({data:null,message:'ID Not Found',error:'Not found'})
       }
      res.status(200).json({data:deleted,message:'Deleted',error:null})
 }catch(error){
  res.status(500).json({ data:null,message:'Failed',error:err.message})
 }
}

