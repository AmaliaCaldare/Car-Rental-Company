
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const RentalPoint= require('../models/RentalPoint')

router.get('/rentalpoint', (req, res) => {
    RentalPoint.query()
        .then(rentalpoints => {
            res.status(200).send(rentalpoints)
        })
})

router.get('/rentalpoint/:id', (req, res) => {
    let id = parseInt(req.params.id)
    RentalPoint.query()
        .where('id', id)
        .then(rentalpoints => {
            res.json(rentalpoints)
        })
})

  router.post('/rentalpoint', (req, res) => {
    const { name, addressId, contactInfoId } = req.body;
    if(name, addressId, contactInfoId) {
      try{
        RentalPoint.query().insert({
            name,
            addressId,
            contactInfoId
        }).then(newItem => {
          return res.redirect('/api/rentalpoint');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.delete("/rentalpoint/:Id", async (req,res) => {
    const rentalPoint = await RentalPoint.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/rentalpoint")
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