exports.seed = function(knex){
    return knex('users').insert([
        {firstName: 'Maria', lastName: 'Ilieva', phoneNumber: "1029384756", email: "maria@gmail.com", licenceNum: 123, passportNum: 1, addressId: 3, password: "12345"},
        {firstName: 'Plamena', lastName: 'Stefanova', phoneNumber: "1029384756", email: "plamena@gmail.com", licenceNum: 222, passportNum: 00, addressId: 1, password: "12345"},
        {firstName: 'Amalia', lastName: 'Caldare', phoneNumber: "1029384756", email: "amalia@gmail.com", licenceNum: 02, passportNum: 1, addressId: 2, password: "12345"},
    ])
}