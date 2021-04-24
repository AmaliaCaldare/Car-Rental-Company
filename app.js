const express = require('express');
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded);

const {Model} = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const knex = Knex(knexFile.development);
Model.knex(knex);

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", port)
});