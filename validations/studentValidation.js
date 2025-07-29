const Joi = require('joi')

const studentSchema=Joi.object({
    name:Joi.string().min(3).required(),
    age:Joi.number().integer().min(1).required(),
    department:Joi.string()
})
const idSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})
module.exports={studentSchema,idSchema}