const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const UserRole = require('../models/UserRole')

router.get('/userRole', (req, res) => {
    UserRole.query()
        .then(userroles => {
            res.status(200).send(userroles)
        })
})

router.get('/userRole/:id', (req, res) => {
    let id = parseInt(req.params.id)
    UserRole.query()
        .where('id', id)
        .then(userroles => {
            res.json(userroles)
        })
})

  router.post('/add-userRole', (req, res) => {
    const { roleId, userId } = req.body;
    if(roleId && userId) {
      try{
        UserRole.query().insert({
            roleId, userId 
        }).then(newItem => {
          return res.redirect('/api/userRole');
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