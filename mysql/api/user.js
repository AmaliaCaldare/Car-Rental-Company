const express = require('express')
const router = express.Router()

const User = require('../models/User')
const UserRole = require('../models/UserRole')
const Role = require('../models/Role')

const bcrypt = require('bcrypt');
const saltRounds = 12;

router.get('/user', (req, res) => {
    User.query()
        .then(users => {
            res.status(200).send(users)
        })
})

router.get('/user/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find user with id ${id}`
                })
            }
        })
});

router.post('/user', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, licenceNum, passportNum,password,addressId } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if(firstName && lastName &&  phoneNumber &&  email &&  licenceNum &&  passportNum &&  hashedPassword && addressId) {
        try{
            User.query().insert({
                firstName, lastName, phoneNumber, email, licenceNum, passportNum,
                password: hashedPassword,
                addressId
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

router.delete("/user/:id", async (req,res) => {
    const { id } = req.params;
    await User.query().delete().where({'id': id});
    return res.status(200).send({
        message: `User with id ${id} has been successfully deleted`
    })
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
        User.query().where('id', id).update(changes).
            then(() => {
            User.query().where('id', id).then(result => { res.status(200).send(result[0])});
        });
    } catch(error) {
        console.log(error);
        return res.status(500).send({response: 'Something went wrong with the DB'});
    }
});

router.get('/userRoles', async (req, res) => {
    const { email } = req.body;

    const user = await User.query().select('id').where('email', email).limit(1);

    if (user.length === 0) {
        res.status(404).send({error: `User with email '${email}' not found`});
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

    res.status(404).send({error: `Roles not found for user with email '${email}' `});

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
