const { Model } = require('objection');

const RentalPoint = require('./RentalPoint.js');

class ContactInfo extends Model {
    static tableName = 'contact_info';

    static relationMappings = {
        rentalPoint: {
            relation: Model.HasManyRelation,
            modelClass: RentalPoint,
            join: {
              from: 'contact_info.id',
              to: 'rental_points.contact_info_id'
            }
        }
    }
}

module.exports = ContactInfo;