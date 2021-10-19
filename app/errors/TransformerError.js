const { messages } = require('@config/errors');
const ApplicationError = require('./ApplicationError');

class TransformerError extends ApplicationError {
  constructor(message = messages.transformer_error, status = 400) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message;
    this.status = status;
  }
}

module.exports = TransformerError;
