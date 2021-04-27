exports.seed = function(knex){
    return knex('reviews').insert([
        { description: "Amazing service and a very nice car", rating: 5, date: "28-04-21 13:00:00", rentalId: 1},
    ])
}