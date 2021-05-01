
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()
const _ = require('lodash');

const User = require('../models/User')
const UserRole = require('../models/UserRole')
const Role = require('../models/Role')
const userRole = require('./userRole')

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

  router.post('/user', (req, res) => {
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

router.delete("/user/:Id", async (req,res) => {
  const user = await User.query().delete().where({'id': req.params.Id});
  return res.redirect("/api/user")
});

router.get('/users/name', (req, res) => {
    const { firstName, lastName } = req.body;
    User.query().where('firstName', firstName).andWhere('lastName', lastName)
      .then( (user) => { 
        if(user.length !== 0) { 
          res.json(user);
          return;
         } 
         res.status(404).send({error: 'User not found'}) })
 });

 router.put('/user/:id', async (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  try{
    User.query()
          .where('id', id)
          .update(changes)
          .then(user => {
            res.json(user)
        })
  } catch(error) {
        console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
  }
});

 router.get('/userRoles', async (req, res) => {
  const { email } = req.body;

  const user = await User.query().select('id').where('email', email).limit(1);

  if (user.length === 0) {
    res.status(404).send({errror: `User with email '${email}' not found`});
    return;
  };

  const userRoles = await UserRole.query().select('roleId').where('userId', user[0].id);
  const rolesList = [];
   await Promise.all(
    userRoles.map( async (userRole) => {
      const roles = await Role.query().select('name').where('id', userRole.roleId);
      roles.map((role) => {
        rolesList.push(role.name);
      });
  }));

  if (rolesList.length !== 0) {
    res.json(rolesList);
    return;
  }

  res.status(404).send({errror: `Roles not found for user with email '${email}' `});
 
 });

module.exports = {
  router: router
}

/* 
{
         "firstName":"Mike", 
         "lastName":"Wazowski", 
         "phoneNumber":"+359886552535",
         "email":"mike@gmail.com", 
         "licenceNum" :"1123321",
         "passportNum":"3332112",
         "password":"IamCoolMikeWazowski",
         "addressId":"1"
}
*/