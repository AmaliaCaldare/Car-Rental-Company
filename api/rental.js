
const express = require('express')
const router = express.Router()

const Rental = require('../models/Rental')

router.get('/rental', (req, res) => {
    Rental.query()
        .then(rentals => {
            res.json(rentals)
        })
})

router.get('/rental/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Rental.query()
        .where('id', id)
        .then(rental => {
            res.json(rental)
        })
})



module.exports = {
    router: router
}