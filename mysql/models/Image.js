const { Model } = require('objection');

const VehicleImage = require('./VehicleImage.js');

class Image extends Model {
    static tableName = 'images';

    static relationMappings = {
        vehicleImage: {
            relation: Model.HasManyRelation,
            modelClass: VehicleImage,
            join: {
              from: 'images.id',
              to: 'vehicle_images.image_id'
            }
        }
    }
}

module.exports = Image;