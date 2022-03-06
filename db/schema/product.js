const {Schema,model}=require("mongoose");

const ProductsSchema = new Schema({


    "name": String,
    "category":String,
    "description": String,
    "type":String,
    "THC":String,
    "CBD":String,
    "price": [{
        "eighth":Number,
        "quarter":Number,
        "oz":Number
        
    }],

    "discountPrice":Number,
    
    "image":String,
    "createdOn":{type :Date,
        default:Date.now()},
    "isTopProduct":Boolean
    

})

const ProductModel = model("product",ProductsSchema,"products");

module.exports=ProductModel;