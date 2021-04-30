
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

  router.post('/rental/add', (req, res) => {
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

  router.get("/rental/delete/:Id", async (req,res) => {
    const rental = await Rental.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/rental")
});

module.exports = {
    router: router
}

/* 
{
          "rentalStart":"2021-11-02 12:00:00", 
         "rentalEnd":"2021-11-03 12:00:00", 
         "finalPrice":"600",
         "userId":"1", 
         "vehicleId" :"1"
}
*/