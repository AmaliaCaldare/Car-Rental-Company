
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const Address = require('../models/Address')

router.get('/address', (req, res) => {
    Address.query()
        .then(addresses => {
            res.status(200).send(addresses)
        })
})

router.get('/address/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Address.query()
        .where('id', id)
        .then(address => {
            res.json(address)
        })
})

  router.post('/address/add', (req, res) => {
    const { streetName, streetNumber, city, country, postalCode } = req.body;
    if(streetName && streetNumber && city && country && postalCode) {
      try{
           Address.query().insert({
          streetName,
          streetNumber,
          city,
          country,
          postalCode
          
        }).then(newItem => {
          return res.redirect('/api/address');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.delete("/address/delete/:addressId", async (req,res) => {
    const address = await Address.query().delete().where({'id': req.params.addressId});
    return res.redirect("/api/address")
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