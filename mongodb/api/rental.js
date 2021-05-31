const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const RentalModel = require('../models/rental')

router.get('/rentals', async (req, res) => {
    const rentals = await RentalModel.find()
    res.status(200).send(rentals)
});

router.get('/rental/:id', async (req, res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    const rental = await RentalModel.findById({ _id: oId })
    res.status(200).send(rental)
});

router.post('/rental', async (req, res) => {
    const { rentalStart, rentalEnd, finalPrice, reviews, userId, vehicleId } = req.body;
    if(rentalStart, rentalEnd, finalPrice, reviews, userId, vehicleId) {
        const rental = new RentalModel({
            rentalStart: new Date(rentalStart), rentalEnd: new Date(rentalEnd), finalPrice: finalPrice, 
            reviews: reviews, userId: userId, vehicleId: vehicleId
        })
        const newRental = await rental.save()
        return res.status(200).send(newRental);
      }
  })

router.delete("/rental/:id", async (req,res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    await RentalModel.findByIdAndRemove({_id: oId});
    return res.status(200).send({message:`Rental with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}