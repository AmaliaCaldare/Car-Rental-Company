const express = require('express');
const app = express();

const mongoose = require('./service/mongodbService');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect();

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", PORT)
});