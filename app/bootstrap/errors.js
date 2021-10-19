const ValidationError = require('@app/errors/ValidationError');

const handle = (err, req, res, next) => {
  switch (err.constructor) {

    case ValidationError:
      return res.error(err, 422);

    default:
      return res.error(err, 500);
  }
}

module.exports = {
  handle
}
