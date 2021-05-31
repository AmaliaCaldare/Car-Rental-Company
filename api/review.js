const express = require('express')
const router = express.Router()

const Review = require('../models/Review')

router.get('/review', (req, res) => {
    Review.query()
        .then(reviews => {
            res.status(200).send(reviews)
        })
})

router.get('/review/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Review.query()
        .where('id', id)
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find review with id ${id}`
                })
            }
        })
})

router.post('/review', (req, res) => {
    const { description, rating, date, rentalId } = req.body;
    if(description && rating && date && rentalId) {
      try{
           Review.query().insert({
            description, rating, date, rentalId

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

  router.delete("/review/:id", async (req,res) => {
      const { id } = req.params;
    await Review.query().delete().where({'id': id});

    return res.status(200).send({message:`Review with id ${id} was successfully deleted`})
});

module.exports = {
    router: router
}

/*
{
          "description":"This rental was superb!",
         "rating":"5",
         "date":"2028-04-21 13:00:00",
         "rentalId":"2"
}
 */
