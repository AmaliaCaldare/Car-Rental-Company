exports.seed = function(knex){
    return knex('vehicle_images').insert([
        {imageId: 1, vehicleId: 1},
        {imageId: 2, vehicleId: 2},
        {imageId: 3,  vehicleId: 3}
    ])
}