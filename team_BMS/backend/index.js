// Constants

const express = require("express")
const app = express()
const env = require("dotenv").config()

// Third Party Module
const cors = require("cors")
const mongoose = require("mongoose")
const port = process.env.PORT || 8080
const route = require("./routes/route")
const errorHandler = require("./middleware/errorhandler")

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//custom made middleware
app.use("/v1/api", route)
app.use(errorHandler)


//server and mongodb connect
mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    app.listen(port, () => {
        console.log(`port is running on ${port}`)
    })
    console.log("monogdb is connected")
}).catch((err) => {
    console.log(err)
})




