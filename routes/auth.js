const Role = require('../models/Role');
const User = require('../models/User');

const UserRole = require('../models/UserRole');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const route = require('express').Router()

route.post("/login", async (req,res) => {
  
    const { email, password } = req.body;
  
    const adminRoleId = await Role.query().select('id').where({name: 'ADMIN'})
    const employeeRoleId = await Role.query().select('id').where({name: 'EMPLOYEE'})

    const adminRole = await UserRole.query().select().where({roleId: adminRoleId});
    const employeeRole = await UserRole.query().select().where({roleId: employeeRoleId});

    if(email && password){
            try{
                const user = await User.query().select().where({'email': email}).limit(1);
                    if(user.length>0){
                        bcrypt.compare(password, user[0].password).then(async (isMatch) => {
                            if(isMatch){
                                const userRole = await UserRole.query().select().where({userId: user[0].id}).limit(1)
                                req.session.user = user;
                                if(userRole[0].roleId == adminRoleId){
                                    req.session.isAdmin = true;
                                }
                                res.status(200).send({message: "Successfully logged in"});
                            }
                            else {
                                res.status(422).send({error: "Wrong username or password"});
                            }
                        });
                    } else {
                        res.status(422).send({error: "Wrong username or password"});
                    }
            } catch (error){
                return res.status(500).send({error: "Something went wrong with the db"});
            }
    } else {
        res.status(422).send({error: "Missing fields: username, password"});
    }
        
});

route.post("/signup", async (req,res) => {
   
    const { email, password, passwordRepeat, firstName, lastName, phoneNumber } = req.body;
    const isPasswordTheSame = password === passwordRepeat;

    if (email && password && isPasswordTheSame){
        if(password.length < 8){
            res.status(422).send({message: "Password does not fulful the requirements.(Minimum 8 characters)"});
        } else {
            try {
                 const emailFound = await User.query().select().where({'email': email}).limit(1);
                 if(emailFound.length > 0){
                     res.status(409).send({error: "Username already exists"});
                     
                 } else {
                     const defaultUserRoles = await Role.query().select().where({name: 'CUSTOMER'});
                     const hashedPassword = await bcrypt.hash(password, saltRounds);
                     User.query().insert({
                         email,
                         password: hashedPassword,
                         firstName,
                         lastName,
                         phoneNumber,
                         licenceNum: 0,
                         passportNum: 0,
                         addressId: 1
                     }).then(async (user) => {
                        const userRoleId = await UserRole.query().insert({
                            roleId: defaultUserRoles[0].id,
                            userId: user.id
                        });
                     });
                   res.status(200).send({message: "User has been created successfully"});
                 }
            } catch (error){
                console.log(error);
                return res.status(500).send({error: "Something went wrong with the db"});
            }
        }
    } else if (password && passwordRepeat && !isPasswordTheSame) {
        res.status(422).send({error: "Password and Repeat password does not match"});
    } else {
        res.status(422).send({error: "Missing fields: username, password, passwordRepeat"});
    }
});

module.exports = route;
