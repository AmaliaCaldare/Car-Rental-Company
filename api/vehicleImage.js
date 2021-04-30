
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

  router.post('/vehicleImage/add', (req, res) => {
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

  router.delete("/vehicleImage/delete/:imageId/:vehicleId", async (req,res) => {
    const image = await VehicleImage.query().delete().where({'imageId': req.params.imageId,'vehicleId':req.params.vehicleId});
    return res.redirect("/api/vehicleImage")
});


module.exports = {
    router: router
}

/* 
{
         "imageId":"1",
         "vehicleId":"2"   
}
*/