const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost:27017/foodOrb",{
    useNewUrlParser:true})

// mongoose.connect(mongoDbUrl,{useNewUrlParser:true})


// async function connect(){
//     console.log("connected")
//     await mongoose.connect("mongodb://localhost:27017/foodOrb")
// }

// connect()