const express = require('express')
const router = express.Router()

const UserRole = require('../models/UserRole')

router.get('/userRole', (req, res) => {
    UserRole.query()
        .then(userRoles => {
            res.status(200).send(userRoles)
        })
})

router.get('/userRole/:id', (req, res) => {
    let id = parseInt(req.params.id)
    UserRole.query()
        .where('userId', id)
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find user role with id ${id}`
                })
            }
        })
})

  router.post('/userRole', (req, res) => {
    const { roleId, userId } = req.body;
    if(roleId && userId) {
      try{
        UserRole.query().insert({
            roleId, userId
        }).then(newItem => {
          return res.status(200).send(newItem);
        });
      }
      catch(error) {
          console.log(error);
        return res.status(500).send({response: 'Something went wrong with the DB'});
      }
    }
  })

router.delete("/userRole/:roleId/:userId", async (req,res) => {
    const { roleId, userId}= req.params;
    await UserRole.query().delete().where(
        {'roleId': roleId,
            'userId': userId
        });
     res.status(200).send({
         message: `User role with the roleId ${roleId} and ${userId} has been successfully deleted`
     })
  });


module.exports = {
    router: router
}

/*
{
         "roleId":"1",
         "userId":"2"

}
*/
