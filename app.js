const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {Model} = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const knex = Knex(knexFile.development);
Model.knex(knex);

const session = require('express-session');
app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,
    resave: false,
    name: 'uniqueSessionID',
    saveUninitialized: true,
}));

const checkSession = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.status(401).send({error: "You're not logged in"});
        return;
    }
    next();
}

// Endpoints
app.use('/api', require('./api/auth.js').router)

// require log in to access
app.use('/api', checkSession, require('./api/rental').router)
app.use('/api', checkSession, require('./api/address').router)
app.use('/api', checkSession,require('./api/contactinfo').router)
app.use('/api', checkSession, require('./api/vehicletype').router)
app.use('/api', checkSession, require('./api/role').router)
app.use('/api', checkSession, require('./api/image').router)
app.use('/api', checkSession, require('./api/rentalpoint').router)
app.use('/api', checkSession, require('./api/vehicle').router)
app.use('/api', checkSession, require('./api/vehicleImage').router)
app.use('/api', checkSession, require('./api/user').router)
app.use('/api', checkSession, require('./api/userRole').router)
app.use('/api', checkSession, require('./api/review').router)

app.use('/test', (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).send("ok");

    }
    else {
        res.status(401).send({error: 'You are not logged in'})
    }
})


const fs = require('fs');
const { sign } = require('crypto');


//to be deleted
const loginPage = fs.readFileSync('./public/login.html', 'utf8');
const signupPage = fs.readFileSync('./public/signup.html','utf8');
const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const footerPage = fs.readFileSync('./public/footer.html', 'utf8');

app.get('/login',(req,res)=>{
    res.send(headerPage + loginPage + footerPage);
} )

app.get('/', (req,res)=> {
    return res.redirect('/login');
})


app.get('/signup', (req,res)=> {
    res.send(headerPage + signupPage + footerPage);
})


const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", PORT)
});
