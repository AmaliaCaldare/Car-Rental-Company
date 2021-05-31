const express = require('express')
const router = express.Router()

const VehicleImage = require('../models/VehicleImage')

router.get('/vehicleImage', (req, res) => {
    VehicleImage.query()
        .then(vehicleImages => {
            res.status(200).send(vehicleImages)
        })
})

//get images by vehicle id
router.get('/vehicleImage/:id', (req, res) => {
    let id = parseInt(req.params.id)
    VehicleImage.query()
        .where('vehicleId', id)
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find user with id ${id}`
                })
            }
        })
})

router.post('/vehicleImage', (req, res) => {
    const { imageId, vehicleId } = req.body;
    if(imageId && vehicleId) {
      try{
           VehicleImage.query().insert({
            imageId, vehicleId

        }).then(newItem => {
          return res.status(200).send(newItem);
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

router.delete("/vehicleImage/:imageId/:vehicleId", async (req,res) => {
      const {imageId, vehicleId } = req.params;
      await VehicleImage.query().delete().where({'imageId': imageId,'vehicleId': vehicleId});
      return res.status(200).send({
          message: `Vehicle image has been successfully deleted`
      })
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
