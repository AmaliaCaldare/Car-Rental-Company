exports.seed = function(knex){
    return knex('rentals').insert([
        { rentalStart: "27-04-21 12:00:00", rentalEnd: "28-04-21 12:00:00", finalPrice: 1000, userId: 1, vehicleId: 1 },
    ])
}