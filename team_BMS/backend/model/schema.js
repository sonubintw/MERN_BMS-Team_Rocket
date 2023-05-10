const mongoose = require("mongoose")
const { Schema, model } = mongoose


//Schema for submission of data
const movieSchema = new Schema({
    movie: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required: true
    }
},
    { timestamps: true }
)

const movie = model("booking", movieSchema)
module.exports = movie