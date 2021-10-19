const ReportService = require('@app/services/ReportService');
const ReportTransformer = require('@app/transformers/ReportTransformer');

const reportService = new ReportService;
module.exports = {

  /**
   * retrives records
   *
   * @param  {[req]}   req  [request object]
   * @param  {[res]}   res  [response object]
   * @param  {Function} next [next object]
   * @return {[json]}        [response json]
   */
  post: async (req, res, next) => {
    
    const response = await reportService.getData(req.body);
    
    return res.transformItems(ReportTransformer,response);
  },

  /**
   * validate login credentials and
   * generate jwt token
   *
   * @param  {[req]}   req  [request object]
   * @param  {[res]}   res  [response object]
   * @param  {Function} next [next object]
   * @return {[json]}        [response json]
   */
  get: async (req, res, next) => {
    
    const response = await reportService.getData(req.query);
    
    return res.transformItems(ReportTransformer,response);
  }
  
}
