const { Model } = require('objection');

const VehicleType = require('./VehicleType.js');
const RentalPoint = require('./RentalPoint.js');
const VehicleImage = require('./VehicleImage.js');
const Rental = require('./Rental.js');



class Vehicle extends Model {
    static tableName = 'vehicles';

    static relationMappings = {
        vehicleType: {
            relation: Model.BelongsToOneRelation,
            modelClass: VehicleType,
            join: {
              from: 'vehicles.vehicle_type_id',
              to: 'vehicle_types.id'
            }
        },
        rentalPont: {
            relation: Model.BelongsToOneRelation,
            modelClass: RentalPoint,
            join: {
              from: 'vehicles.rental_point_id',
              to: 'rental_points.id'
            }
        },
        vehicleImage: {
            relation: Model.HasManyRelation,
            modelClass: VehicleImage,
            join: {
              from: 'vehicles.id',
              to: 'vehicle_images.vehicle_id'
            }
        },
        rental: {
            relation: Model.HasManyRelation,
            modelClass: Rental,
            join: {
              from: 'vehicles.id',
              to: 'rentals.vehicle_id'
            }
        }
    }
}

module.exports = Vehicle;