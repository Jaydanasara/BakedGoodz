const { Router } = require("express");
const router = Router();

const ProductModel = require("../db/schema/product")
router.get("/", async (req, res, next) => {

    try {
        const doc = await ProductModel.find({}).then((data) => {
           
            if (data) {
              
                res.status(200).json(data)
            }
            else res.status(204).json({ error: "No products found." })
        })

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
        res.status(200).json(doc);

    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})



router.post("/addProduct", async (req, res) => {

    console.log("made ")

    const newProduct = req.body;
  
    // console.log("email", newUser.Email)


    try {

       
        const product = await new ProductModel(newProduct).save()
        console.log(product)
        if (product) {
            res.status(200).json({ status: "success", data: product })
        }
     
    } catch (err) {
        res.status(500).json({ status: "Error Occured." })
    }


})










module.exports = router