const { Model } = require('objection');

class User extends Model {
    static tableName = 'users';

    static get relationMappings() {
        const Rental = require('./Rental.js');
        const Address = require('./Address.js');
        const UserRole = require('./UserRole.js');

       return {
           address: {
               relation: Model.BelongsToOneRelation,
               modelClass: Address,
               join: {
                   from: 'users.address_id',
                   to: 'addresses.id'
               }
           },
           rentals: {
               relation: Model.HasManyRelation,
               modelClass: Rental,
               join: {
                   from: 'users.id',
                   to: 'rentals.user_id'
               }
           },
           userRoles: {
               relation: Model.HasManyRelation,
               modelClass: UserRole,
               join: {
                   from: 'users.id',
                   to: 'user_roles.user_id'
               }
           }
       }
    }
}

module.exports = User;
