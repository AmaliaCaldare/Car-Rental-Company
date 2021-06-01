const { Model } = require('objection');

const Vehicle = require('./Vehicle.js');

class VehicleType extends Model {
    static tableName = 'vehicle_types';

    static relationMappings = {
        vehicle: {
            relation: Model.HasManyRelation,
            modelClass: Vehicle,
            join: {
              from: 'vehicle_types.id',
              to: 'vehicles.vehicle_type_id'
            }
        }
    }
}

module.exports = VehicleType;