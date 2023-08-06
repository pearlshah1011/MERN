const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema
const validator=require('validator')

//header in jwt
//contains algorithm in jwt
//payload in jwt
//contains non sensitive user data eq username etc
//signature
//used to verify token by server

const userSchema= new Schema({
    email:
    {
      type:String,
      required:true,
      unique:true
    },
    password:
    {
        type:String,
        required:true,

    }

})

//static signup
userSchema.statics.signup=async function(email,password)
{
    //validation
    if(!email || !password)
    {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password not strong enough')
    }



    const exists= await this.findOne({email})

    if(exists)
    {
        throw Error('email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email,password:hash})
   return user
}
module.exports=mongoose.model('User',userSchema)