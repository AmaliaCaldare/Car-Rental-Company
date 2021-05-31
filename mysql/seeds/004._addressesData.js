exports.seed = function(knex){
    return knex('addresses').insert([
        { streetName: "Lygten", streetNumber: "12", city: "Copenhagen", country: "Denmark", postalCode: 2400},
        { streetName: "Glasvej", streetNumber: "10", city: "Copenhagen", country: "Denmark", postalCode: 2400},
        { streetName: "Dalslandsage", streetNumber: "9", city: "Copenhagen", country: "Denmark", postalCode: 2300},
    ])
}