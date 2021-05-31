const express = require('express');
const app = express();

const mongoose = require('./service/mongodbService');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect();

const PORT = 3000;

app.use('/api', require('./api/rentalpoint').router)
app.use('/api', require('./api/vehicle').router)
app.use('/api', require('./api/user').router)
app.use('/api', require('./api/rental').router)


app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", PORT)
});