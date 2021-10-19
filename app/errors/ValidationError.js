const { messages } = require('@config/errors');
const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
  constructor(errors = {}, message = messages.validation_error, status = 422) {
    super(errors);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

module.exports = ValidationError;
