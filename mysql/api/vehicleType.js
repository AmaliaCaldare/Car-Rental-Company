const express = require('express')
const router = express.Router()

const VehicleType = require('../models/VehicleType')

router.get('/vehicleType', (req, res) => {
    VehicleType.query()
        .then(vehicleTypes => {
            res.status(200).send(vehicleTypes)
        })
})

router.get('/vehicleType/:id', (req, res) => {
    let id = parseInt(req.params.id)
    VehicleType.query()
        .where('id', id)
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

router.put('/vehicleType/:id', (req, res) => {
    let id = parseInt(req.params.id)
    const {label} = req.body;
    VehicleType.query().update({label}).where('id',id)
     .then(() => {
         VehicleType.query().where('id', id).then(result => {res.status(200).send(result[0]);})
     })
  .catch(e => res.status(500).json(e));
})

router.post('/vehicletype', (req, res) => {
    const { label } = req.body;
    if(label) {
      try{
        VehicleType.query().insert({
          label
        }).then(newItem => {
          return res.status(200).send(newItem);
        });
      }
      catch(error) {
          console.log(error);
        return res.status(500).send({error: 'Something went wrong with the DB'});
      }
    }
  })

router.delete("/vehicleType/:id", async (req,res) => {
    const { id } = req.params;
    await VehicleType.query().delete().where({'id': id });
    return res.status(200).send(
        {
            message: `Vehicle type with id ${id} has been successfully deleted`
        }
    )
});

module.exports = {
    router: router
}

/*
  {
          "label":"testType"
}
*/
