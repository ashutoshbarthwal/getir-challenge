const { messages } = require('@config/errors');

class ApplicationError extends Error {
  constructor(message = messages.application_error, status = 500) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

module.exports = ApplicationError;
