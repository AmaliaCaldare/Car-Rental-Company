exports.seed = function(knex){
    return knex('vehicles').insert([
        {brand: 'Tesla', model: 'Model X', description: "", 
            numberPlate: "A1D", price: 1000, vehicleTypeId: 1, rentalPointId: 1},
        {brand: "Volkswagen", model: 'Type 2', description: "", 
            numberPlate: "A1D", price: 10000, vehicleTypeId: 2, rentalPointId: 2},
        {brand: 'Opel', model: 'PRIUS', description: "", 
            numberPlate: "A1D", price: 10200, vehicleTypeId: 3, rentalPointId: 3},
    ])
}