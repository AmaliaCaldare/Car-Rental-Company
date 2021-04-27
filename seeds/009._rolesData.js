exports.seed = function(knex){
    return knex('roles').insert([
        {name: 'ADMIN'},
        {name: 'EMPLOYEE'},
        {name: 'CUSTOMER'}
    ])
}