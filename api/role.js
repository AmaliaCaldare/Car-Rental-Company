
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const Role = require('../models/Role')

router.get('/Role', (req, res) => {
    Role.query()
        .then(roles => {
            res.status(200).send(roles)
        })
})

router.get('/role/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Role.query()
        .where('id', id)
        .then(roles => {
            res.json(roles)
        })
})

  router.post('/role/add', (req, res) => {
    const { name } = req.body;
    if(name) {
      try{
        Role.query().insert({
          name
        }).then(newItem => {
          return res.redirect('/api/role');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.delete("/role/delete/:Id", async (req,res) => {
    const role = await Role.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/role")
});

module.exports = {
    router: router
}

/* 
{
         "name":"testRole"
}
*/