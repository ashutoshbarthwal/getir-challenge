const { exec } = require('child_process');


/**
 * runs all migrations in database/migrations folder
 */
const runMigrations = async () => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      {env: process.env},
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
}

/**
 *runs all seeders in database/seeders folder
 */
const runSeeders = async () => {
  await new Promise((resolve, reject) => {
    const seed = exec(
      'sequelize db:seed:all',
      {env: process.env},
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );

    // Forward stdout+stderr to this process
    seed.stdout.pipe(process.stdout);
    seed.stderr.pipe(process.stderr);
  });
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
