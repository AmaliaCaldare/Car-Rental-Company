exports.seed = function (knex) {
    return knex('reviews').del()
        .then(function  () {
            return knex('rentals').del()
            .then(function  () {
                return knex('user_roles').del()
                .then(function  () {
                    return knex('roles').del()
                    .then(function  () {
                        return knex('users').del()
                        .then(function  () {
                            return knex('vehicle_images').del()
                            .then(function  () {
                                return knex('vehicles').del()
                                .then(function  () {
                                    return knex('rental_points').del()
                                    .then(function  () {
                                        return knex('addresses').del()
                                        .then(function  () {
                                            return knex('contact_info').del()
                                            .then(function  () {
                                                return knex('images').del()
                                                .then(function  () {
                                                    return knex('vehicle_types').del()
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })

        })
}