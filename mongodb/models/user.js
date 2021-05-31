const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    licenseNumber: {
        type: Number,
        required: true
    },
    passportNumber: {
        type: Number,
        required: true
    },
    address: {
        streetName: String,
        streetNumber: Number,
        city: String,
        country: String,
        postalCode: Number
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)