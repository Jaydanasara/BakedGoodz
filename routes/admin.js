const { Router } = require("express");
const router = Router();
const ProductModel = require("../db/schema/product")

router.post("/products", async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const newProduct = new ProductModel(body);
        const response = await newProduct.save();
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})

router.patch("/products/:id", async (req, res) => {
    console.log("admin patch")
    const { body, params } = req;
    const { id } = params
    console.log(id)
    try {
        const response = await ProductModel.updateOne({ _id: id }, body)
        res.status(201).json(response);
        console.log(response)

    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})

router.delete("/products/:id", async (req, res) => {
    console.log("admin delete product")
    const { body, params } = req;
    const { id } = params
    console.log(id)
    try {
        const response = await ProductModel.deleteOne({ _id: id })
        res.status(200).json(response);
        console.log(response)

    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})

router.get("/:id", async (req, res) => {
    console.log("get product by id")
    const { body, params } = req;
    const { id } = params
    console.log(id)
    try {
        // id === _id (mongooose)
        const doc = await ProductModel.findOne({ _id: id })
        console.log(doc)
        res.json(doc);

    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})

// router.get("/", async (req, res, next) => {

//     try {
//         const doc = await ProductModel.find({}).then((data) => {
//             if (data)
//             {
//                 res.json(data)
//             }
//             else res.status(204).json({ error: "No products found."})
//         })

//     } catch (error) {
//         console.log(error);
//         console.log(error)
//         res.status(500).json({ status: "Error Occured." })
//     }
// })
module.exports = router