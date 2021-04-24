const { Model } = require('objection');

const Vehicle = require('./Vehicle.js');
const Address = require('./Address.js');

class RentalPoint extends Model {
    static tableName = 'rental_points';

    static relationMappings = {
        vehicle: {
            relation: Model.HasManyRelation,
            modelClass: Vehicle,
            join: {
              from: 'rental_points.id',
              to: 'vehicles.rental_point_id'
            }
        },
        address: {
            relation: Model.BelongsToOneRelation,
            modelClass: Address,
            join: {
              from: 'rental_points.address_id',
              to: 'addresses.id'
            }
        }
    }
}

module.exports = RentalPoint;