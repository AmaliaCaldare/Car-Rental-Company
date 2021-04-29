exports.seed = function(knex){
    return knex('vehicle_types').insert([
        {label: 'suv'},
        {label: 'van'},
        {label: 'sedan'}
    ])
}