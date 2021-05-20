const express = require('express')
const router = express.Router()

const ContactInfo = require('../models/ContactInfo')

router.get('/contactInfo', (req, res) => {
    ContactInfo.query()
        .then(contact_info => {
            res.status(200).send(contact_info);
        })
})

router.get('/contactInfo/:id', (req, res) => {
    let id = parseInt(req.params.id)
    ContactInfo.query()
        .where('id', id)
        .then(contact_info => {
            res.status(200).send(contact_info[0]);
        })
})

  router.post('/contactInfo', (req, res) => {
    const { email, phoneNumber, openingTime, closingTime } = req.body;
    if(email && phoneNumber && openingTime && closingTime) {
      try{
        ContactInfo.query().insert({
          email,
          phoneNumber,
          openingTime,
          closingTime

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

router.delete("/contactInfo/:id", async (req,res) => {
    const { id } = req.params;

    await ContactInfo.query().delete().where({'id': id});

    res.status(200).send({message: `Contact info with id ${id} was successfully deleted`});
});


module.exports = {
    router: router
}

/*
{
         "email":"email@gmail.com",
         "phoneNumber":"+45 42338405",
         "openingTime":"10:00",
         "closingTime" :"17:30"
}
*/
