const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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