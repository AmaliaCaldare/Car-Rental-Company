const { Model } = require('objection');

const Rental = require('./Rental.js');

class Review extends Model {
    static tableName = 'reviews';

    static relationMappings = {
        rental: {
            relation: Model.BelongsToOneRelation,
            modelClass: Rental,
            join: {
              from: 'reviews.rental_id',
              to: 'rentals.id'
            }
        }
    }
}

module.exports = Review;