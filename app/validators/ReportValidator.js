const Validator = require('./Validator');

class ReportValidator extends Validator {

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
      case 'list':
        rules = {
        startDate: 'required|date',
        endDate: 'required|date',
        maxCount:'required|integer|min:0',
        minCount:'required|integer|min:0'
        };

        break;
     
    }

    return rules;
  }


}

module.exports = ReportValidator;
