const { Schema, model } = require("mongoose");



const OrdersSchema = new Schema({


    "user":{
    "user":String,
    "firstName":String,
    "lastName":String,
    "address":String,
    "phoneNo":String,
    },
    "orderPlacedOn": {
        type: Date,
        default: Date.now()
    },
    "isDelivered": Boolean,
    "orderDeliveredON": { type: Date },
    "status":{type: String, default:"Processing"},

    "cart": [{
        "productId": String,
        "name": String,
        "category":String,
        "description": String,
        "price": Number,
        "image":String,
        "createdOn":{type :Date},
        "quantity": Number,
    }],
    "total":Number
})

const OrdersModel = model("order", OrdersSchema, "orders");

module.exports = OrdersModel;