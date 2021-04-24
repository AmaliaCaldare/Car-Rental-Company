const { Model } = require('objection');

const RentalPoint = require('./RentalPoint.js');
const User = require('./User.js');


class Address extends Model {
    static tableName = 'addresses';

    static relationMappings = {
        rentalPoint: {
            relation: Model.HasManyRelation,
            modelClass: RentalPoint,
            join: {
              from: 'addresses.id',
              to: 'rental_points.address_id'
            }
        },
        user: {
            relation: Model.HasManyRelation,
            modelClass: User,
            join: {
              from: 'addresses.id',
              to: 'users.address_id'
            }
        }
    }
}

module.exports = Address;