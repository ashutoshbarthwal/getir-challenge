const BaseTransformer = require('./BaseTransformer');

class ReportTransformer extends BaseTransformer {
  /**
   * transformer Report
   *
   * @param  {[type]} Report [description]
   * @return {[type]}      [description]
   */
  transform() {
    const report = this.data;

    return {
      key: report.key,
      createdAt: report.createdAt,
      totalCount: report.totalCount,
    }
  }
}

module.exports = ReportTransformer;
