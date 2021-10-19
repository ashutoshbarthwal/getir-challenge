const Validator = require('./Validator');

class UserValidator extends Validator {

  /**
   * Validation rules.
   *
   * @param  string type
   * @param  array data
   * @return Object
   */
  getRules(type, data = {}) {
    let rules = {};

    switch (type) {
      case 'create':
        rules = {
          first_name: 'required|string|max:255|min:1',
          last_name: 'required|string|max:255|min:1',
          email: 'required|unique:User,email|email',
          password: 'required|min:6|max:255'
        };

        break;

      case 'update':
        rules = {
          first_name: 'required|string|max:255|min:1',
          last_name: 'required|string|max:255|min:1',
          email: `required|unique:User,email,${data.except.email}|email`,
          password: 'min:6|max:255',
        };

        break;

      case 'login':
        rules = {
          email: 'required|email',
          password: 'required|min:6|max:255',
        };

        break;

      case 'update-profile':
        rules = {
          first_name: 'required|string|max:255|min:1',
          last_name: 'required|string|max:255|min:1',
        };

        break;

      case 'update-password':
        rules = {
          password: 'required|string|max:255|min:6|confirmed',
        };

        break;

      case 'forgot-password':
        rules = {
          email: 'required|email|exist:User,email'
        };

        break;

      case 'reset-password':
        rules = {
          email: 'required|email|exist:User,email',
          password: 'required|min:6|max:255'
        };

        break;
    }

    return rules;
  }


}

module.exports = UserValidator;
