const {Strategy:JWTStrategy, ExtractJwt}=require('passport-jwt')
const User = require('../models/authModel')
const dotenv=require('dotenv')
const passport = require('passport')
dotenv.config()

const opts ={
    jwtFromRequest:
    ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET
}
  
    module.exports=(passport)=>{
        passport.use(new JWTStrategy(opts,async(jwt_payload,done)=>{
        try{
            const user = await User.findById(jwt_payload.id)
            if(user)return done(null,user)
            else return done(null,false)
        }catch(err){
            return done(err,false)
        }
    }))
}