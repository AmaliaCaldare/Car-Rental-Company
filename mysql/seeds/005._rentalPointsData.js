exports.seed = function(knex){
    return knex('rental_points').insert([
        { name: "Center", addressId: 1, contactInfoId: 1 },
        { name: "Main office", addressId: 2, contactInfoId: 1 },
        { name: "Airport", addressId: 3, contactInfoId: 1 }
    ])
}