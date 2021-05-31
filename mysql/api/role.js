const express = require('express')
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
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find role with id ${id}`
                })
            }
        })
})

router.post('/role', (req, res) => {
    const { name } = req.body;
    if(name) {
      try{
        Role.query().insert({
          name
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

router.delete("/role/:id", async (req,res) => {
    const { id } = req.params;

    await Role.query().delete().where({'id': id});
    return res.status(200).send({ message: `Role with id ${id} was successfully deleted`});
});

module.exports = {
    router: router
}

/*
{
         "name":"testRole"
}
*/
