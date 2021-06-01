
exports.up = function(knex) {
    return knex.schema
    .createTable('vehicle_types', (table) => {
        table.increments('id').primary();
        table.string('label').notNullable();
    })
    .createTable('images', (table) => {
        table.increments('id').primary();
        table.string('source').notNullable();
    })
    .createTable('contact_info', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('phone_number').notNullable();
        table.time('opening_time').notNullable();
        table.time('closing_time').notNullable()
    })
    .createTable('addresses', (table) => {
        table.increments('id').primary();
        table.string('street_name').notNullable();
        table.string('street_number').notNullable();
        table.string('city').notNullable();
        table.string('country').notNullable()
        table.integer('postal_code').notNullable()
    })
    .createTable('rental_points', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('address_id').unsigned().notNullable();
        table.foreign('address_id').references('addresses.id');
        table.integer('contact_info_id').unsigned().notNullable();
        table.foreign('contact_info_id').references('contact_info.id');
    })
    .createTable('vehicles', (table) => {
        table.increments('id').primary();
        table.string('brand').notNullable();
        table.string('model').notNullable();
        table.string('description');
        table.float('price').notNullable();
        table.string('number_plate').notNullable();
        table.integer('vehicle_type_id').unsigned().notNullable();
        table.foreign('vehicle_type_id').references('vehicle_types.id');
        table.integer('rental_point_id').unsigned().notNullable();
        table.foreign('rental_point_id').references('rental_points.id');
    })
    .createTable('vehicle_images', (table) => {
        table.integer('image_id').unsigned().notNullable();
        table.foreign('image_id').references('images.id');
        table.integer('vehicle_id').unsigned().notNullable();
        table.foreign('vehicle_id').references('vehicles.id');
        table.primary(['image_id', 'vehicle_id']);
    })
    .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone_number').notNullable();
        table.string('email').notNullable();
        table.integer('licence_num').notNullable();
        table.integer('passport_num').notNullable();
        table.string('password').notNullable();
        table.integer('address_id').unsigned().notNullable();
        table.foreign('address_id').references('addresses.id');
    })
    .createTable('roles', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    })
    .createTable('user_roles', (table) => {
        table.integer('role_id').unsigned().notNullable();
        table.foreign('role_id').references('roles.id');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.primary(['role_id', 'user_id']);
    })
    .createTable('rentals', (table) => {
        table.increments('id').primary();
        table.timestamp('rental_start').notNullable();
        table.timestamp('rental_end').notNullable();
        table.float('final_price').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('vehicle_id').unsigned().notNullable();
        table.foreign('vehicle_id').references('vehicles.id');
    })
    .createTable('reviews', (table) => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.integer('rating').notNullable()
        table.timestamp('date').notNullable();
        table.integer('rental_id').unsigned().notNullable();
        table.foreign('rental_id').references('rentals.id');
    })
    
    .createTable('rentals_audits',(table) => {
        table.increments('change_id').primary();
        table.integer('rental_id').notNullable();
        table.timestamp('rental_start').notNullable();
        table.timestamp('rental_end').notNullable();
        table.float('final_price').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.integer('vehicle_id').unsigned().notNullable();
        //https://stackoverflow.com/a/6017018
        table.string('user_firstname').notNullable();
        table.string('user_lastname').notNullable();
        table.string('vehicle_brand').notNullable();
        table.string('number_plate').notNullable();
        table.timestamp('updated_at').notNullable();
        table.string('updated_by').notNullable();
        table.timestamp('valid_from');
        table.timestamp('valid_to');
    })

};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('rentals')
    .dropTableIfExists('user_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('users')
    .dropTableIfExists('vehicle_images')
    .dropTableIfExists('vehicles')
    .dropTableIfExists('rental_points')
    .dropTableIfExists('addresses')
    .dropTableIfExists('contact_info')
    .dropTableIfExists('images')
    .dropTableIfExists('vehicle_types')
};
