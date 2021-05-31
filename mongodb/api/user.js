const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const UserModel = require('../models/user')

router.get('/users', async (req, res) => {
    const users = await UserModel.find()
    res.status(200).send(users)
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    const user = await UserModel.findById({ _id: oId })
    res.status(200).send(user)
});

router.post('/user', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, licenseNumber, passportNumber, address, password, roles } = req.body;
    if(firstName, lastName, phoneNumber, email, licenseNumber, passportNumber, address, password, roles) {
        const user = new UserModel({
            firstName: firstName,lastName: lastName, phoneNumber: phoneNumber,
            licenseNumber: licenseNumber, passportNumber: passportNumber,
            email: email, address: address, password: password, roles: roles
        })
        const newUser = await user.save()
        return res.status(200).send(newUser);
      }
  })

router.delete("/user/:id", async (req,res) => {
    const { id } = req.params;
    const oId = mongoose.Types.ObjectId(id);
    await UserModel.findByIdAndRemove({_id: oId});
    return res.status(200).send({message:`User with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}