const { Schema, model } = require("mongoose");



const OrdersSchema = new Schema({

    "user": String,
    "orderPlacedOn": {
        type: Date,
        default: Date.now()
    },
    "isDelivered": Boolean,
    "orderDeliveredON": { type: Date },

    "cart": [{
        "productId": String,
        "quantity": Number
    }]
})

const OrdersModel = model("order", OrdersSchema, "orders");

module.exports = OrdersModel;