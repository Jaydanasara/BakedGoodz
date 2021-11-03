const { Router } = require("express");
const router = Router()
const JWT = require("jsonwebtoken")
const SECRET_KEY = "fjdskl543543hyrtewoujrkfldsbnm,cxnvjdfh43534"

const OrdersModel = require("../db/schema/orders")


router.post("/", async (req, res) => {
console.log("hello")
  const order = req.body;
  const { authorization } = req.headers;
  console.log("hey" + authorization)
  if (!order.cart.length > 0) {
    res.json({
      status: "error",
      message: "No cart items sent.",
    });
    return false;
  }

  try {
    JWT.verify(authorization, SECRET_KEY, (errorpayload, payload) => {
      if (errorpayload) {
      
        res.json({
          status: "error",
          message: "User needs to be logged in to place order.",
        });
        return false;
      }
    });
  
    const newOrder = new OrdersModel(order);
    const response = await newOrder.save();
    res.json(response)

  } catch (error) {
    console.log("error caught in make order, check http response")
    res.status(500).json({ status: "Error Occured.", error })
  }

});

router.get("/", async (req, res) => {

  const { authorization } = req.headers;
  let payLoad = ""

  try {
    JWT.verify(authorization, SECRET_KEY, (errorpayload, payload) => {
      if (errorpayload) {
        console.log(errorpayload)
        res.json({
          status: "error",
          message: "User needs to be logged in to get orders.",
        });
        return false;
      } else {
        payLoad = payload
      }
    });
    const response = await OrdersModel.find({ userid: payLoad.id })

    res.json(response)

  } catch (error) {
    console.log("error caught in get orders route, check http response");
    res.status(500).json({ status: "Error Occured.", error })
  }

});

// router.get("/", async (req, res) => {

//   const { authorization } = req.headers;
//   let payLoad = ""

//   try {
//     JWT.verify(authorization, SECRET_KEY, (errorpayload, payload) => {
//       if (errorpayload) {
//         console.log(errorpayload)
//         res.json({
//           status: "error",
//           message: "User needs to be logged in to place order.",
//         });
//         return false;
//       } else {
//         payLoad = payload
//       }
//     });
//     const response = await OrdersModel.find({ userid: payLoad.id })
//     res.status(300).json(response)

//   } catch (error) {
//     console.log(error);
//     console.log(error)
//     res.status(500).json({ status: "Error Occured." })
//   }

// });

//adminRoute
router.patch("/:id", async (req, res) => {

  const { body, params } = req;
  const { id } = params
  const { authorization } = req.headers;
  let payLoad = ""

  try {
    JWT.verify(authorization, SECRET_KEY, (errorpayload, payload) => {
      if (errorpayload) {
        console.log(errorpayload)
        res.json({
          status: "error",
          message: "User needs to be logged in to place order.",
        });
        return false;
      } else {
        payLoad = payload
      }
    });
    console.log(body)
    const response = await OrdersModel.updateOne({ _id: id }, body)

    res.status(300).json(response)

  } catch (error) {
    console.log("error caught in patch order route, check http response")
    res.status(500).json({ status: "Error Occured.", error })
  }

});


// adminroute delete order

router.delete("/delete/:id", async (req, res) => {

  const { body, params } = req;
  const { id } = params
  const { authorization } = req.headers;
  let payLoad = ""

  try {
    JWT.verify(authorization, SECRET_KEY, (errorpayload, payload) => {
      if (errorpayload) {
        console.log(errorpayload)
        res.json({
          status: "error",
          message: "User needs to be logged in to place order.",
        });
        return false;
      } else {
        payLoad = payload
      }
    });
    const response = await OrdersModel.findByIdAndDelete({ _id: id })

    res.status(300).json(response)

  } catch (error) {
    console.log("error caught in delete order, check http response")
    res.status(500).json({ status: "Error Occured.", error })
  }

});

module.exports = router