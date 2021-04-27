exports.seed = function(knex){
    return knex('images').insert([
        {source: '/image1/src'},
        {source: '/image2/src'},
        {source: '/image3/src'}
    ])
}