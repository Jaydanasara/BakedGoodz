import { Router } from 'express';
const router = Router();
const JWT = require("jsonwebtoken")
const UserModel = require("../db/schema/user")
const ProductModel = require("../db/schema/product")
const SECRET_KEY = "fjdskl543543hyrtewoujrkfldsbnm,cxnvjdfh43534"

const categories = [ 'electronics', 'software', 'clothing', 'accessories', 'food', 
'sports', 'cameras', 'books'
]

router.get("/banner", async (req, res) => {

    try {
        const docs = await ProductModel.find({}, 'name images' , { sort: { _id: -1 }}).limit(3)
        if (docs) {
            // console.log(docs) 
            res.status(200).json({ status: "success", products: docs })
        }
        else {
            res.status(403).json({ status: "products not found." })
        }
        // if (payload) {
        //     const user = await UserModel.findOne({ _id: payload.id }, "-password");
        //     res.status(200).json({ status : "sucess", profile : user })
        // }
        // else
        // { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})

router.get("/categories", async (req, res) => {

    // try {
    //     const docs = await ProductModel.find({}, 'name images' , { sort: { _id: -1 }}).limit(3)
    //     if (docs) {
    //         // console.log(docs) 
    //         res.status(200).json({ status: "success", products: docs })
    //     }
    //     else {
    //         res.status(403).json({ status: "products not found." })
    //     }
    //     // if (payload) {
    //     //     const user = await UserModel.findOne({ _id: payload.id }, "-password");
    //     //     res.status(200).json({ status : "sucess", profile : user })
    //     // }
    //     // else
    //     // { res.status(403).json({ status: "user not found" }) }

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ status: "some error occured", error: "error" })
    // }

    res.status(200).json({ status: "success", categories: categories.sort(() => Math.random() - Math.random()).slice(0, 3) });

})

router.get("/products", async (req, res) => {

    try {
        const docs = await ProductModel.aggregate([{ $sample: { size: 8 } }])
        console.log(docs)
        if (docs) {
            // console.log(docs) 
            res.status(200).json({ status: "success", products: docs })
        }
        else {
            res.status(403).json({ status: "products not found." })
        }
        // if (payload) {
        //     const user = await UserModel.findOne({ _id: payload.id }, "-password");
        //     res.status(200).json({ status : "sucess", profile : user })
        // }
        // else
        // { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})

module.exports = router