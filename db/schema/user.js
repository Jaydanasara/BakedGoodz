const {Schema,model} = require("mongoose");
const bcrypt = require('bcrypt');
const { resourceLimits } = require("worker_threads");
const e = require("express");
const UserSchema = new Schema({

    "email":String,
    "password":String,
    "userName":String,
    "first_name":String,
    "last_name":String,
    "profileImage": String,
    "address":String,
    "phoneNo":String,
    "createdOn" : { default : Date.now(), type : Date},
    "isAdmin" : { default : false , type : Boolean}
})


UserSchema.pre('save',function(next){
    if(this.isModified('password')){
        
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    }
})


UserSchema.methods.comparePassword= async function (password){
    if(!password)throw new Error('password is missing cant compare')
    
    try {
        const result=await bcrypt.compare(password,this.password)

        return result
    } catch (error) {
        console.log('error while comparing password',error.message)
    }
}

const UserModel = model("user",UserSchema,"users");

module.exports=UserModel;