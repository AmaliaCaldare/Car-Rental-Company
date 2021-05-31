const { Model } = require('objection');

const Review = require('./Review.js');
const User = require('./User.js');
const Vehicle = require('./Vehicle.js');


class Rental extends Model {
    static tableName = 'rentals';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'rentals.user_id',
              to: 'users.id'
            }
        },
        vehicle: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vehicle,
            join: {
              from: 'rentals.vehicle_id',
              to: 'vehicles.id'
            }
        },
        review: {
            relation: Model.HasManyRelation,
            modelClass: Review,
            join: {
              from: 'rentals.id',
              to: 'reviews.rental_id'
            }
        }
    }
}

module.exports = Rental;