
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const VehicleImage = require('../models/VehicleImage')

router.get('/vehicleImage', (req, res) => {
    VehicleImage.query()
        .then(vehicleimages => {
            res.status(200).send(vehicleimages)
        })
})

router.get('/vehicleImage/:id', (req, res) => {
    let id = parseInt(req.params.id)
    VehicleImage.query()
        .where('id', id)
        .then(vehicleimages => {
            res.json(vehicleimages)
        })
})

    // add-rental/123/2020-07-28/2020-07-28/2019/321/333
    

  router.post('/add-vehicleImage', (req, res) => {
    const { imageId, vehicleId } = req.body;
    if(imageId && vehicleId) {
      try{
           VehicleImage.query().insert({
            imageId, vehicleId
          
        }).then(newItem => {
          return res.redirect('/api/vehicleImage');
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