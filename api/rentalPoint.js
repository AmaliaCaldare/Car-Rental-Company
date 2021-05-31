const express = require('express')
const router = express.Router()

const RentalPoint= require('../models/RentalPoint')

router.get('/rentalpoint', (req, res) => {
    RentalPoint.query()
        .then(rentalPoints => {
            res.status(200).send(rentalPoints)
        })
})

router.get('/rentalpoint/:id', (req, res) => {
    let id = parseInt(req.params.id)
    RentalPoint.query()
        .where('id', id)
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find rental point with id ${id}`
                })
            }
        })
});

router.post('/rentalpoint', (req, res) => {
    const { name, addressId, contactInfoId } = req.body;
    if(name, addressId, contactInfoId) {
      try{
        RentalPoint.query().insert({
            name,
            addressId,
            contactInfoId
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

router.delete("/rentalpoint/:id", async (req,res) => {
    const { id } = req.params;

    await RentalPoint.query().delete().where({'id': id});

    return res.status(200).send({message:`Contact info with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}

/*
{
          "name":"New Office",
         "addressId":"1",
         "contactInfoId":"1"
}
*/
