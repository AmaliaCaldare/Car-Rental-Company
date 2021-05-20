const express = require('express')
const router = express.Router()

const Rental = require('../models/Rental')
const User = require('../models/User')

router.get('/rental', (req, res) => {
    Rental.query()
        .then(rentals => {
            res.status(200).send(rentals);
        })
})

router.get('/rental/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Rental.query()
        .where('id', id)
        .then(rental => {
            res.status(200).send(rental[0]);
        })
})

router.put('/rental/:id', async (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  try{
    Rental.query()
          .where('id', id)
          .update(changes)
          .then(rental => {
            res.status(200).send(rental);
        })
  } catch(error) {
        console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
  }
});

  router.post('/rental', (req, res) => {
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
          return res.status(200).send(newItem);
        });
      }
      catch(error) {
        return res.status(500).send({response: 'Something went wrong with the DB'});
      }
    }
  });

  router.delete("/rental/:id", async (req,res) => {
      const {id} = req.params;

      await Rental.query().delete().where({ 'id': id });

      res.status(200).send({error: `Rental with id ${id} was successfully deleted`});
});

  router.get('/rentals/user', (req, res) => {
    const { email } = req.body;

    User.query().select('id').where('email', email).limit(1)
      .then((user) => {
        Rental.query().where('userId', user[0].id).then( (rentals) => {
          if (rentals.length !== 0) {
            res.json(rentals);
            return;
          }
          res.status(404).send({error: `Rentals not found for user with email '${email}'`});
        });
      });
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
