const { Model } = require('objection');

const UserRole = require('./UserRole.js');

class Role extends Model {
    static tableName = 'roles';

    static relationMappings = {
        userRoles: {
            relation: Model.HasManyRelation,
            modelClass: UserRole,
            join: {
              from: 'roles.id',
              to: 'user_roles.role_id'
            }
        }
    }
}

module.exports = Role;