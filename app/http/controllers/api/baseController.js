const BaseService = require("@app/services/BaseService");
const BaseTransformer = require("@app/transformers/BaseTransformer");

const baseService = new BaseService();

module.exports = {
  /**
   * validate refresh token and
   * generate jwt token
   *
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  getIndex: async (req, res, next) => {
    const data = await baseService.get();
    return res.transformItem(BaseTransformer, data);
  }
};
