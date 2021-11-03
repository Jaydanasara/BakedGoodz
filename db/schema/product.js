const {Schema,model}=require("mongoose");

const ProductsSchema = new Schema({


    "name": String,
    "category":String,
    "description": String,
    "price": Number,
    "discountPrice":Number,
    
    "image":String,
    "createdOn":{type :Date,
        default:Date.now()},
    "isTopProduct":Boolean
    

})

const ProductModel = model("product",ProductsSchema,"products");

module.exports=ProductModel;