const Student = require('../models/studentModel')

exports.getAllStudents = async()=>{
    return await Student.find()
}

exports.getStudentById = async(id)=>{
    return await Student.findById(id)
}

exports.createStudent = async(data)=>{
    const newStudent = new Student(data)
    return await newStudent.save()
}

exports.updateStudent=async(id,data)=>{
    return await Student.findByIdAndUpdate(id,data,{new:true})
}

exports.deleteStudent=async(id)=>{
    return await Student.findByIdAndDelete(id)
}