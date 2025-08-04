const mongoose=require('mongoose')

const validateID=(req,res,next)=>{
    const id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid ID Format'})
    }
    next()
}

module.exports=validateID