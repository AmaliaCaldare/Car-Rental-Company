
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const Rental = require('../models/Rental')

router.get('/rental', (req, res) => {
    Rental.query()
        .then(rentals => {
            res.json(rentals)
        })
})

router.get('/rental/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Rental.query()
        .where('id', id)
        .then(rental => {
            res.json(rental)
        })
})

    // add-rental/123/2020-07-28/2020-07-28/2019/321/333
    

  router.post('/add-rental', (req, res) => {
    const { rentalStart, rentalEnd, finalPrice, userId, vehicleId } = req.body;
    if(rentalStart && rentalEnd && finalPrice && userId && vehicleId) {
      try{
           Rental.query().insert({
          rentalStart,
          rentalEnd,
          finalPrice,
          userId,
          vehicleId
          
        }).then(newItem => {
          return res.redirect('/api/rental');
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