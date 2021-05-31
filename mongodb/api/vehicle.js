const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const VehicleModel = require('../models/vehicle')

router.get('/vehicles', async (req, res) => {
    const vehicles = await VehicleModel.find()
    res.status(200).send(vehicles)
});

router.get('/vehicle/:id', async (req, res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    const vehicle = await VehicleModel.findById({ _id: oId })
    res.status(200).send(vehicle)
});

router.post('/vehicle', async (req, res) => {
    const { model, brand, description, numberPlate, price, type, images, rentalPointId } = req.body;
    if(model, brand, description, numberPlate, price, type, images, rentalPointId) {
        const vehicle = new VehicleModel({
            model: model, brand: brand, description: description, numberPlate: numberPlate,
            price: price, type: type, images: images, rentalPointId: rentalPointId
        })
        const newVehicle = await vehicle.save()
        return res.status(200).send(newVehicle);
      }
  })

router.delete("/vehicle/:id", async (req,res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    await VehicleModel.findByIdAndRemove({_id: oId});
    return res.status(200).send({message:`Vehicle with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}