const ValidatorJS = require('validatorjs');
const ValidationError = require('@app/errors/ValidationError');
const {
  env
} = require('@config/app');
const config = require('@config/database.js')[env];
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(config.database, config.username, config.password, config);
/**
 * Validator Base Class
 */
class Validator {
  constructor() {
    if (this.constructor === Validator) {
      throw new TypeError('Abstract class "Validator" cannot be instantiated directly.');
    }

    if (this.getRules === undefined) {
      throw new TypeError('"getRules" widget abstract class');
    }
  }

  /**
   * Get rules according to the passed type & meta_data
   *
   * @param  string type
   * @param  array  meta_data
   * @return Object
   */
  getRules(type, meta_data = {}) {}

  /**
   * Get custom messages
   *
   * @param  string type
   * @return Object
   */
  getMessages(type) {
    return {};
  }

  /**
   * Get custom attribute names
   *
   * @param  string type
   * @return Object
   */
  getAttributeNamesForHuman(type) {
    return {};
  }

  /**
   * Validate Data
   *
   * @param  array    inputs
   * @param  string   type
   * @param  Object   meta_data
   * @return boolean
   */
  validate(inputs, type, meta_data = {}) {
    return new Promise((resolve, reject) => {
      const validator = new ValidatorJS(
        inputs,
        this.getRules(type, meta_data, inputs),
        this.getMessages(type)
      );

      const handleFails = () => reject(new ValidationError(validator.errors.all()));

      if (validator.hasAsync) {
        validator.passes(() => resolve());
        validator.fails(() => handleFails());
      } else {
        if (validator.passes()) {
          resolve();
        } else {
          handleFails();
        }
      }
    });
  }
}

module.exports = Validator;
