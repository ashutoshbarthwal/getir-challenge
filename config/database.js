const { env } = require('@app/utils/helpers');

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | config for development environment
  |--------------------------------------------------------------------------
  */
  development: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data"
  },

  /*
  |--------------------------------------------------------------------------
  | config for test environment
  |--------------------------------------------------------------------------
  */
  test: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data"
  },

  /*
  |--------------------------------------------------------------------------
  | config for production environment
  |--------------------------------------------------------------------------
  */
  production: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data"
  },
};
