
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const User = require('../models/User')

router.get('/user', (req, res) => {
    User.query()
        .then(Users => {
            res.status(200).send(Users)
        })
})

router.get('/user/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .then(Users => {
            res.json(Users)
        })
})

  router.post('/add-user', (req, res) => {
    const { firstName, lastName, phoneNumber, email, licenceNum, passportNum,password,addressId } = req.body;
    if(firstName && lastName &&  phoneNumber &&  email &&  licenceNum &&  passportNum && password && addressId) {
      try{
        User.query().insert({
            firstName, lastName, phoneNumber, email, licenceNum, passportNum,password,addressId
        }).then(newItem => {
          return res.redirect('/api/user');
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