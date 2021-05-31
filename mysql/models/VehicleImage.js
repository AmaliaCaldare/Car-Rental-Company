const { Model } = require('objection');

const Image = require('./Image.js');
const Vehicle = require('./Vehicle.js');

class VehicleImage extends Model {
    static tableName = 'vehicle_images';

    static relationMappings = {
        image: {
            relation: Model.BelongsToOneRelation,
            modelClass: Image,
            join: {
              from: 'images.id',
              to: 'vehicle_images.image_id'
            }
        },
        vehicle: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vehicle,
            join: {
              from: 'vehicles.id',
              to: 'vehicle_image.vehicle_id'
            }
        }
    }
}

module.exports = VehicleImage;