### Car Rental Company 

Final project for the Database class.

The repository consists in two services: mysql and mongodb service.

### Project set up

### MySql service:

1. Create database instance.
2. Create a `mysqlCredentials.js` file in the `config` directory and add credentials. See the `mysqlCredentials.template.js` for the template.
3. Run `npm install` to install the dependencies of the project.
4. Run `npm run migrate:latest` to create the migration.
5. Run `npm run seeed:run` to populate the database.
6. Run `npm run cleandb` to rollback, create and populate the database again.
7. Run `npm run start-dev` to start the server.

### Mongodb service:

1. Connect to the MongoDb Atlas Connection.
2. Add connection uri to the `default.json` config file.
3. Run `npm install` to install all the dependencies of the project.
4. Run `npm run start-dev` to start the server.
