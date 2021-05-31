const mongoose = require("mongoose");

let vehicleSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: String,
  numberPlate: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  images: [String],
  rentalPointId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Vehicle', vehicleSchema)

  