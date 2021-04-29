exports.seed = function(knex){
    return knex('contact_info').insert([
        {phoneNumber: '50239290', email: "crc@gmail.com", openingTime: "09:30:00", closingTime: "16:30:00"},
    ])
}