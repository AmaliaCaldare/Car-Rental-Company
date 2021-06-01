const mongoose = require("mongoose");

let rentalPointSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        streetName: String,
        streetNumber: Number,
        city: String,
        country: String,
        postalCode: Number
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('RentalPoint', rentalPointSchema)