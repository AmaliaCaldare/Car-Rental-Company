const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const RentalPointModel = require('../models/rentalPoint')

router.get('/rentalpoints', async (req, res) => {
    const rentalPoints = await RentalPointModel.find()
    res.status(200).send(rentalPoints)
});

router.get('/rentalpoint/:id', async (req, res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    const rentalPoint = await RentalPointModel.findById({ _id: oId })
    res.status(200).send(rentalPoint)
});

router.post('/rentalpoint', async (req, res) => {
    const { name, address, phoneNumber, email, openingTime, closingTime } = req.body;
    if(name, address, phoneNumber, email, openingTime, closingTime) {
        const rentalPoint = new RentalPointModel({
            name: name, address: address, phoneNumber: phoneNumber, email: email,
            openingTime: openingTime, closingTime: closingTime
        })
        const newPoint = await rentalPoint.save()
        return res.status(200).send(newPoint);
      }
  })

router.delete("/rentalpoint/:id", async (req,res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    await RentalPointModel.findByIdAndRemove({_id: oId});
    return res.status(200).send({message:`Rental point with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}