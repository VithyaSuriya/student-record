const Joi=require('joi')

const validateQuery=(req,res,next)=>{
    const schema=Joi.object({
        page:Joi.number().integer().min(1).optional(),
        limit:Joi.number().integer().min(1).optional(),
        search:Joi.string().min(1).optional(),
        sortBy:Joi.string().valid('username','email','createdAt').optional(),
        order:Joi.string().valid('asc','desc').optional()
    })
    const {error}=schema.validate(req,query)
    if(error){
        return res.status(400).json({error:
    error.details[0].message})
}
next()
}

module.exports=validateQuery