const express = require('express')
const router = express.Router()

const Address = require('../models/Address')

router.get('/address', (req, res) => {
    Address.query()
        .then(addresses => {
            res.status(200).send(addresses)
        })
})

router.get('/address/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Address.query()
        .where('id', id)
        .then(address => {
            res.status(200).send(address[0]);
        })
})

router.post('/address', (req, res) => {
    const { streetName, streetNumber, city, country, postalCode } = req.body;
    if(streetName && streetNumber && city && country && postalCode) {
      try{
           Address.query().insert({
          streetName,
          streetNumber,
          city,
          country,
          postalCode}).then(newItem => {
           res.status(200).send(newItem);
          });
      }
      catch(error) {
         res.status(500).send({error: 'Something went wrong with the DB'});
      }
    }
  })

router.delete("/address/:addressId", async (req,res) => {
    const { addressId } = req.params;

    await Address.query().delete().where({'id': addressId});

    res.status(200).send({message: `Address with id ${addressId} was successfully deleted`});
});


module.exports = {
    router: router
}
/*
{
  "streetName":"Guldbergsgade",
  "streetNumber":"29N",
  "city":"Copenhagen",
  "country":"Denmark",
  "postalCode":"2200"

}
 */
