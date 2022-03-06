const { Router } = require("express");
const router = Router();
const JWT = require("jsonwebtoken");
const { resourceUsage } = require("process");
const SECRET_KEY = "fjdskl543543hyrtewoujrkfldsbnm,cxnvjdfh43534"
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const ProductModel = require("../db/schema/product")
var items = require("./products")
var mongoose = require("mongoose")

const refreshItems= async function(){
    
    try {
        const doc = await ProductModel.find({}).then((data) => {
        
         
            if (data) {

                items.storeItems=data
            }
            else res.status(204).json({ error: "No products found." })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error Occured." })
    }

}

if(items.storeItems === undefined){
refreshItems()

}




router.post("/", async (req, res) => {

    var total = 0
    const order =req.body
    order.cart.map(item=>{

                const storeItem=items.storeItems.find(product=>product.id===item._id)
                total= total + (item.quantity* storeItem.price)
    })
    try {
      
        var token = req.body.token

        const customer = stripe.customers
            .create({
                email: token.email,
                source: token.id
            })
            .then((customer) => {
                console.log(customer);
                return stripe.charges.create({
                    amount: total*100,
                    description: "productsfrom Baked Goodz",
                    currency: "USD",
                    customer: customer.id,
                });
            })
            .then((charge) => {
                console.log(charge);
                res.json({
                    data: "success"
                })
            })
            .catch((err) => {
                res.json({
                    data: "failure",
                });
            });
        return true;
    } catch (error) {
        return false;
     }

})




module.exports = router