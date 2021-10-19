const _ = require('lodash');
const dotenv = require('dotenv');
const path = require('path');
const envPath = `.env.${process.env.NODE_ENV}`;

dotenv.load({ path: envPath });

module.exports = {
  /**
   * loads a specific key from .env
   * if not found, return the defaulValue
   */
  env: function(key, defaultValue) {
    const value = process.env[key];

    if (value) return value;

    return defaultValue;
  },

  /**
   * returns jwt token from req if any
   *
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
  getTokenFromReq: (req) => {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  },

  /**
   * computes paginated meta
   *
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  computePaginationMeta: ({ page, limit, count }) => {
    return {
      currentPage: parseInt(page),
      limit: parseInt(limit),
      total: count
    }
  }

}
