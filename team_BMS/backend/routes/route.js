const express = require("express")
const route = express.Router()
const movie = require("../model/schema")



//create data
route.post("/selectmovie", async (req, res, next) => {

    //logic for missing data
    if (!req.body.movie || !req.body.time || !req.body.seats) {
        let err = new Error("Input required")
        return next(err)
    }

    // console.log(req.body.seats)
    const data = await new movie({
        movie: req.body.movie,
        time: req.body.time,
        seats: req.body.seats

    }).save()
    req.perviousMovieId = data._id
    // console.log(req)
    res.status(201).send(data)
})

//deleting database
route.delete("/delete", async (req, res) => {
    try {
        await movie.deleteMany()
        res.send("deleted all")

    } catch (error) {
        return next(error)
    }
})

//getting data
route.get("/getdata", async (req, res) => {

    try {
        const lastDetails = await movie.findOne({}, null, { sort: { $natural: -1 } });
        res.send(lastDetails);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving last details');
    }
})



module.exports = route
