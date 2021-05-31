const { Model } = require('objection');

const User = require('./User.js');
const Role = require('./Role.js');


class UserRole extends Model {
    static tableName = 'user_roles';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'users.id',
              to: 'user_role.user_id'
            }
        },
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: Role,
            join: {
              from: 'roles.id',
              to: 'user_role.role_id'
            }
        }
    }
}

module.exports = UserRole;