const { Router } = require("express");
const router = Router();
const JWT = require("jsonwebtoken")
const UserModel = require("../db/schema/user")

const expire_time = 60 * 20
// JWT key
const SECRET_KEY = "fjdskl543543hyrtewoujrkfldsbnm,cxnvjdfh43534"


router.get("/allUsers", async (req, res, next) => {

    try {
      const  data=await UserModel.find()
            res.status(201).json({ status: "success", data  })

    } catch (error) {
        console.log("error caught in get user profile, check http response")
        res.status(500).json({ status: "Error Occured.", error })
    }
})




router.post("/login", async (req, res) => {
    console.log("login nooooooooooooooooo")

    const { email, password } = req.body;

    try {
        const doc = await UserModel.findOne({ email, password }, "-password");
        console.log("this is doc" + doc)


        if (doc) {
            const token = JWT.sign({ id: doc._id }, SECRET_KEY, { expiresIn: expire_time })

            res.status(201).json({ status: "success", data: {doc,token} })
        }
        else {
            res.status(403).json({ status: "user not found" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured" })
    }

})






// router.post("/login", async (req, res) => {

//     const { email, password } = req.body;

//     try {

//         const doc = await UserModel.findOne({ email });
//         // console.log(doc)
//         if (doc)
//         {
//             await bcrypt.compare(password, doc.password, (err, result) => {
//                 if (err) {
//                     res.status(500).json({ status: "A system error occurred while validating the password." })
//                     return
//                 }
//                 if (result) {
//                     const { userName, isAdmin, createdOn } = doc;

//                     const token = JWT.sign({ id: doc._id }, SECRET_KEY, { expiresIn: expire_time })
//                     res.status(200).json({ status: "success", data: { userName, email, isAdmin, createdOn, token } })
//                 }
//                 else {
//                     res.status(401).json({ status: "The password is invalid." })
//                 }
//             })
//         }
//         else {
//             res.status(403).json({ status: "An account with that email was not found." })
//         }
//     } catch (error) {
//         console.log("error caught in login route, check http response")
//         res.status(500).json({ status: "some error occured", error })
//     }

// })

router.patch("/:id", async (req, res) => {
    console.log("patch")
    const { body, params } = req;
    const { id } = params
    console.log(id)
    try {
        // id === _id (mongooose)
        const response = await UserModel.updateOne({ _id: id }, { status: "incomplete" })
        res.status(200).json(response);
        console.log(response)

    } catch (error) {

        console.log("error caught in patch user route, check http response")
        res.status(500).json({ status: "Error Occured.", error })
    }
})

router.post("/register", async (req, res) => {

    const newUser = req.body;
 
    try {


        const user = await new UserModel(newUser).save()
        console.log(user)
        if (user) {
            res.status(200).json({ status: "success", data: user })
        }

    } catch (err) {
        console.log("error caught in patch user route, check http response")
        res.status(500).json({ status: "Error Occured.", error })


    }
})





// router.get("/whoami", async (req, res) => {

//     const { authorization } = req.headers;

//     try {
//         const payload = JWT.verify(authorization, SECRET_KEY)

//         if (payload) {
//             console.log(payload.id)
//             const user = await UserModel.findOne({ _id: payload.id }, "-password");

//              res.status(200).json({ status : "sucess", data : user })

//         }
//         else
//          { res.status(403).json({ status: "user not found" }) }

//     } catch (error) {
//         console.log(error)
//         console.log("error caught in whoami route, check http response")
//         res.status(500).json({ status: "some error occured", error })
//     }
// })










router.get("/whoami", async (req, res) => {

    const { authorization } = req.headers
    try {
        const payload = JWT.verify(authorization, SECRET_KEY)

        if (payload) {
            const user = await UserModel.findOne({ _id: payload.id }, "-password");
            res.json({ status : "success", data : user })
        }
        else
        { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        res.status(500).json({ status: "some error occured" })
    }
})





// router.post("/login", async (req, res) => {
//     console.log("testing")
//     const {body} = req;
//     const{userName,password}=body
//     try {
//         const {body} = req;
//         const{userName,password}=body
//         const user = await UserModel.findOne({userName,password})
//         console.log(user)
//         res.json({})

//     } catch (error) {
//         console.log(error);
//         console.log(error)
//         res.status(500).json({ status: "Error Occured." })
//     }
// })


// router.post("/", async (req, res) => {
//     const body = req.body;
//     try {
//         const newUser = new UserModel(body);
//         const response = await newUser.save();
//         res.json(response)

//     } catch (error) {
//         console.log(error);
//         console.log(error)
//         res.status(500).json({ status: "Error Occured." })
//     }
// })

module.exports = router