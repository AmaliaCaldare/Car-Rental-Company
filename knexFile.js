const credentials = require("./config/mySqlCredentials");
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database : credentials.database,
      user : credentials.user,
      password : credentials.password
    },
    ...knexSnakeCaseMappers()
  },

};