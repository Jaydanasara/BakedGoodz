const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const https=("https").default;
const axios = require("axios");
const cors = require("cors")
// const bodyParser =require("body-parser")
require("./db/index");

const path =require('path')
const users = require("./routes/users");
const products = require("./routes/products")
const admin = require("./routes/admin")
const profile = require("./routes/profile")
const homepage = require("./routes/homepage")
const orders = require("./routes/orders");
const { env } = require("process");

const base = "/api/v1"
app.use(cors())
app.use(express.json());


//  app.use(bodyParser.urlencoded({extended:false}))
//  app.use(bodyParser.json)
app.use("/api/v1/users",users)
app.use("/api/v1/products", products)
app.use("/api/v1/admin", admin)
app.use("/api/v1/profile", profile)
app.use("/api/v1/homepage", homepage)
app.use("/api/v1/orders",orders)
app.use("/api/v1/checkout",checkout)
app.use(express.static('public'))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

