const Role = require('../models/Role');
const User = require('../models/User');

const UserRole = require('../models/UserRole');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const route = require('express').Router()

route.post("/login", async (req,res) => {
  
    const { username, password } = req.body;
  
    const adminRoleId = await Role.query.select('roleId').where({name: 'ADMIN'})
    const employeeRoleId = await Role.query.select('roleId').where({name: 'EMPLOYEE'})

    const adminRole = await UserRole.query().select().where({roleId: adminRoleId});
    const employeeRole = await Role.query().select().where({roleId: employeeRoleId});

    if(username && password){
            try{
                const user = await User.query().select().where({'username': username}).limit(1);
                    if(user.length>0){
                        bcrypt.compare(password, user[0].password).then(function(isMatch) {
                            if(isMatch){
                                req.session.user = user;
                                if(adminRole[0].id == user[0].roleId){
                                    req.session.isAdmin = true;
                                }
                                res.send({message: "Successfully logged in"});
                            }
                            else{
                                res.send({error: "Wrong username or password"});
                            }
                        });
                    }else {
                        res.send({message: "Wrong username or password"});
                    }
                
            }catch(error){
                return res.status(500).send({response: "Something went wrong with the db"});
            }

    }else {
        res.send({message: "Missing fields: username, password"});
    
    }
        
});

route.post("/signup", async (req,res) => {
   
    const { email, password, passwordRepeat, firstName, lastName, phoneNumber } = req.body;
    const isPasswordTheSame = password === passwordRepeat;

    if(email && password && isPasswordTheSame){
        if(password.length < 8){
            res.send({message: "Password does not fulful the requirements.(Minimum 8 characters)"});
        }else{
            try{
                 const emailFound = await User.query().select().where({'email': email}).limit(1);
                 if(emailFound.length > 0){
                     res.send({message: "Username already exists"});
                     
                 }else{
                     const defaultUserRoles = await Role.query().select().where({name: 'CUSTOMER'});
                     const hashedPassword = await bcrypt.hash(password, saltRounds);
                     User.query().insert({
                         email,
                         password: hashedPassword,
                         roleId: defaultUserRoles[0].id,
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
                   res.send({success: "User has been created successfully"});
                 }
            }catch (error){
                console.log(error);
                return res.status(500).send({response: "Something went wrong with the db"});
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        res.send({message: "Password and Repeat password does not match"});
    }else {
        res.send({message: "Missing fields: username, password, passwordRepeat"});
    }
    
});
module.exports = route;
