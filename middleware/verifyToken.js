const jwt = require('jsonwebtoken')
const SECRET_KEY=process.env.JWT_SECRET||'Vithya@15'

module.exports=(req,res,next) => {
    const authHeader =req.headers['authorization']
    const token = authHeader&&authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json({data:null,message:'No token provided',error:'No Token found'})
    }
    jwt.verify(token,SECRET_KEY,(err,user)=>{
       if(err){
        return res.status(403).json({data:null,message:'Invalid token',error:err.message})
       }
       req.user=user
       next()
    })
}