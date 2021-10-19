const ReportService = require('@app/services/ReportService');
const ReportTransformer = require('@app/transformers/ReportTransformer');

const reportService = new ReportService;
module.exports = {

  /**
   * validate login credentials and
   * generate jwt token
   *
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  post: async (req, res, next) => {
    
    const response = await reportService.getData(req.query);
    
    return res.transformItems(ReportTransformer,response);
  },
  
}
