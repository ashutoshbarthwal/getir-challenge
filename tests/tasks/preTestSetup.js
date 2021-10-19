const { exec } = require('child_process');


/**
 * runs all migrations in database/migrations folder
 */
const runMigrations = async () => {
 
}

/**
 *runs all seeders in database/seeders folder
 */
const runSeeders = async () => {
 
};

const seedTestData = async () => {
  
}

/**
 * migrates all tables
 */
module.exports = async () => {
  await runMigrations();
  await runSeeders();
  await seedTestData();
}
