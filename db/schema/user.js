const {Schema,model} = require("mongoose");
const UserSchema = new Schema({

    "email":String,
    "password":String,
    "userName":String,
    "first_name":String,
    "last_name":String,
    "profileImage": String,
    "address":String,
    "createdOn" : { default : Date.now(), type : Date},
    "isAdmin" : { default : false , type : Boolean}
})


const UserModel = model("user",UserSchema,"users");

module.exports=UserModel;