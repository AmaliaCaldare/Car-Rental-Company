
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

  router.post('/vehicle', (req, res) => {
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

  router.put('/vehicle/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try{
      Vehicle.query()
            .where('id', id)
            .update(changes)
            .then(vehicle => {
              res.json(vehicle)
          })
    } catch(error) {
          console.log(error);
          return res.send({response: 'Something went wrong with the DB'});
    }
  });

  router.delete("/vehicle/:Id", async (req,res) => {
    const vehicle = await Vehicle.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/vehicle")
  });
  
  router.get('/vehicles/model', (req, res) => {
    const { model } = req.body;
    Vehicle.query().where('model', model)
    .then((vehicle) => {
      if(vehicle.length !== 0) {
        res.json(vehicle); 
        return;
      }
      res.status(404).send({error: 'Vehicle not found'});
      });
  });

module.exports = {
    router: router
}


/* 
{
         "brand":"BMW", 
         "model":"M5", 
         "description":"Fastest car ever",
         "price":"1000", 
         "numberPlate" :"AZ123XY",
         "vehicleTypeId":"1",
         "rentalPointId":"2"   
}
*/