const _ = require('lodash');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { rounds } = require('@config/hashing');

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const password  = await bcrypt.hash('password',rounds);

    const rows = [{
      first_name: 'Base',
      last_name: 'User',
      email: 'base@user.com',
      password: password,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    }];
    
    return queryInterface.bulkInsert('users', rows, {});
  },

  down: (queryInterface, Sequelize) => {

  }
};
