const router = express.Router();
const JWT = require("jsonwebtoken")
const multer = require('multer')
// const upload = multer({ dest: '../db/images/profiles' })
const fs = require('fs')
const path = require('path')

const UserModel = require("../db/schema/user")
const SECRET_KEY = "fjdskl543543hyrtewoujrkfldsbnm,cxnvjdfh43534"
const profileImageDest = './db/images/profiles'

const upload = multer({
    storage: multer.diskStorage({
        // Destination to store image     
        destination: profileImageDest,
        // filename: (req, file, callback) => {
        //     callback(null, file.originalname) }
        filename: (req, file, callback) => callback(null, file.originalname)
    })
}).single('image')

// must be logged in to do this

router.post("/", async (req, res) => {

    const { authorization } = req.headers;

    try {
        const payload = JWT.verify(authorization, SECRET_KEY)

        if (payload) {
            const user = await UserModel.findOne({ _id: payload.id }, "-password");
            res.status(200).json({ status: "sucess", profile: user })
        }
        else { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})

router.delete("/image", async (req, res) => {
    // must be logged in to do this

    const { authorization } = req.headers;

    try {
        const payload = JWT.verify(authorization, SECRET_KEY)

        if (payload) {
            const user = await UserModel.findOne({ _id: payload.id }, "-password");
            user.profileImage = ""
            const successful = await user.save()
            if (successful) {
                res.status(200).json({ status: "sucess", message: "profile image deleted successfully. " })

            }
            else {
                res.status(403).json({ status: "unable to delete user profile image." })
            }
        }
        else { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})

router.patch("/image", upload, async (req, res) => {
    // must be logged in to do this

    const { authorization } = req.headers;
    // res.send(req.file)
    const { file } = req
    // res.send(file)
    try {
        const payload = JWT.verify(authorization, SECRET_KEY)

        if (payload) {

            const user = await UserModel.findOne({ _id: payload.id }, "-password");
            // res.send(user)
            fs.access(user.profileImage, fs.F_OK, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                fs.unlink(user.profileImage)
            })
            user.profileImage = file.path
            // user.profileImage = ""
            const result = await user.save()
            if (result) {
                res.status(200).json({ status: "sucess", message: "profile image updated successfully.", user: result })
            } else {
                res.status(500).json({ status: "error", message: "profile image not updated successfully." })

            }
        }
        else { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})

router.patch("/address", async (req, res) => {
    // must be logged in to do this

    const { authorization } = req.headers;
    const { profile } = req.body
    try {
        const payload = JWT.verify(authorization, SECRET_KEY)

        if (payload) {
            const user = await UserModel.findOne({ _id: payload.id }, "-password");
            console.log("user", user)
            user.address = profile.address
            const result = await user.save()
            if (result) {
                res.status(200).json({ status: "sucess", message: "profile modified successfully." })

            } else {
                res.status(500).json({ status: "error", error: "Profile not saved successfully." })

            }

        }
        else { res.status(403).json({ status: "user not found" }) }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "some error occured", error: "error" })
    }
})


module.exports = router