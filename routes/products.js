const router = express.Router();
let storeItems=[];
const ProductModel = require("../db/schema/product")
router.get("/", async (req, res, next) => {

    try {
        const doc = await ProductModel.find({}).then((data) => {
            storeItems=data
            module.exports.storeItems=storeItems
            if (data) {
            
                res.status(200).json(data)
            }
            else res.status(204).json({ error: "No products found." })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error Occured." })
    }
})

router.get("/:id", async (req, res) => {
    
    const { body, params } = req;
    const { id } = params
    
    try {
        // id === _id (mongooose)
        const doc = await ProductModel.findOne({ _id: id })
       
        res.status(200).json(doc);

    } catch (error) {
        console.log(error);
        console.log(error)
        res.status(500).json({ status: "Error Occured." })
    }
})



router.post("/addProduct", async (req, res) => {

    

    const newProduct = req.body;
  
    // console.log("email", newUser.Email)


    try {

       
        const product = await new ProductModel(newProduct).save()
        
        if (product) {
            res.status(200).json({ status: "success", data: product })
        }
     
    } catch (err) {
        res.status(500).json({ status: "Error Occured." })
    }


})









module.exports.router=router