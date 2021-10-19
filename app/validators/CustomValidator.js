const _ = require('lodash');
const Op = require("sequelize").Op;
const { env } = require('@config/app');
const ValidatorJS = require("validatorjs");

const db = require('@app/models');

class CustomValidator {

  /**
   * add custom validator vlidatorjs
   *
   * @param  {[type]}  ruleName   [description]
   * @param  {[type]}  methodName [description]
   * @param  {Boolean} async      [description]
   * @return {[type]}             [description]
   */
  static init(ruleName, methodName, async = false) {
    if (async) {
      ValidatorJS.registerAsync(
        ruleName,
        CustomValidator[methodName],
        CustomValidator.messages[ruleName] || null
      );
    } else {
      ValidatorJS.register(
        ruleName,
        CustomValidator[methodName],
        CustomValidator.messages[ruleName] || null
      );
    }
  }

 /**
   * Unique Validation Rule
   *
   * @param  string value
   * @param  string attribute
   * @param  string requirement
   * @param  Object passes
   * @return void
   */
  static validateUnique(value, requirement, attribute, passes) {
    const [model, column, ...except] = requirement.split(",");
    const modelClass = db[model];
    except.join(",");

    const key = _.isEmpty(column) ? attribute : column;

    modelClass
      .findOne({
        where: {
          [`${key}`]: value
        }
      })
      .then(obj => {
        if (_.isEmpty(obj)) {
          return passes();
        } else {
          if (
            !_.isEmpty(except) &&
            _.indexOf(except, _.property(key)(obj)) > -1
          ) {
            return passes();
          }

          return passes(false);
        }
      })
      .catch(err => passes(false));
  }

  /**
   * DoesExist Validation Rule
   *
   * @param  {[type]} value       [description]
   * @param  {[type]} requirement [description]
   * @param  {[type]} attribute   [description]
   * @param  {[type]} passes      [description]
   * @return {[type]}             [description]
   */
  static validateIsExist(value, requirement, attribute, passes) {
    const [model, column] = requirement.split(",");
    const key = _.isEmpty(column) ? attribute : column;

    db[model]
      .findOne({
        where: {
          [`${key}`]: value
        }
      })
      .then(obj => {
        return _.isEmpty(obj) ? passes(false) : passes();
      })
      .catch(err => passes(false));
  }

  /**
   * validate exist in
   *
   * @param  {[type]}
   * @param  {[type]}
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  static async validateExistIn(value, requirement, attribute, passes) {
    const uniqueEntities = [...new Set(value)];
    const [model, column, ...except] = requirement.split(",");
    const modelClass = db[model];

    const uniqueEntitiesCount = await modelClass.count({
      where: {
        [`${column}`]: {
          [Op.in]: uniqueEntities
        }
      }
    });

    if (uniqueEntities.length != uniqueEntitiesCount) {
    return passes(false);
    }

    return passes();
  }
 
}

CustomValidator.messages = {
  unique: "The :attribute has already been taken.",
  exist: "The :attribute does not exist.",
  exist_in: "The :attribute does not exist."
};

module.exports = CustomValidator;
