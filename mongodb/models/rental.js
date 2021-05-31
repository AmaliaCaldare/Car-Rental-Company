const mongoose = require("mongoose");

let rentalSchema = mongoose.Schema({
    rentalStart: {
        type: Date,
        required: true,
    },
    rentalEnd: {
        type: Date,
        required: true,
    },
    finalPrice: {
        type: Number,
        required: true
    },
    reviews: [{ 
        description: String, 
        rating: Number,
        date: Date
    }],
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    vehicleId: {
        type: mongoose.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Rental', rentalSchema)