exports.seed = function(knex){
    return knex('user_roles').insert([
        {roleId: '1', userId: '1'},
        {roleId: '2', userId: '2'},
        {roleId: '3', userId: '3'}
    ])
}