const mongoose = require('mongoose');
const config = require('config');

const connect = () => {
    const uri = config.get(`connection`);
    mongoose.connect(uri, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then((db) => {console.log("connected")});
};

module.exports = {
    connect
};