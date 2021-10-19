const { exec } = require('child_process');

const dropTables = async () => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate:undo:all',
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
 * migrates all tables
 */
module.exports = async () => {
  await dropTables();
}
