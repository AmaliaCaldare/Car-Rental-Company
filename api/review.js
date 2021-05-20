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
        .then(reviews => {
            res.json(reviews)
        })
})

  router.post('/review', (req, res) => {
    const { description, rating, date, rentalId } = req.body;
    if(description && rating && date && rentalId) {
      try{
           Review.query().insert({
            description, rating, date, rentalId

        }).then(newItem => {
          return res.redirect('/api/review');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.delete("/review/:Id", async (req,res) => {
    const review = await Review.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/review")
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
