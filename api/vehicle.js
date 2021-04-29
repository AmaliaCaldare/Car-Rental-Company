
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const Vehicle = require('../models/Vehicle')

router.get('/vehicle', (req, res) => {
    Vehicle.query()
        .then(vehicles => {
            res.status(200).send(vehicles)
        })
})

router.get('/vehicle/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Vehicle.query()
        .where('id', id)
        .then(vehicles => {
            res.json(vehicles)
        })
})

  router.post('/add-vehicle', (req, res) => {
    const { brand, model, description, price, numberPlate, vehicleTypeId,rentalPointId } = req.body;
    if(brand && model &&  description &&  price &&  numberPlate &&  vehicleTypeId && rentalPointId ) {
      try{
        Vehicle.query().insert({
            brand, model, description, price, numberPlate, vehicleTypeId,rentalPointId 
        }).then(newItem => {
          return res.redirect('/api/vehicle');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

module.exports = {
    router: router
}