const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Sequelize = require('sequelize');

const { env } = require('@app/utils/helpers');
const { rounds } = require('@config/hashing');
const { messages } = require('@config/errors');
const ReportValidator = require('@app/validators/ReportValidator');

const config = require('@config/database.js')[env('NODE_ENV', 'development')];

class ReportService {

  constructor() {
    this.reportValidator = new ReportValidator;
  }

  /**
   * logins user
   *
   * @param  {[type]} inputs [description]
   * @return {[type]}        [description]
   */
  async getData(inputs) {
    await this.reportValidator.validate(inputs, 'list');
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';
    const client = new MongoClient(url);
    await client.connect()
    const query = {
        createdAt:{
            $gte:new Date(inputs['startDate']), $lt:new Date(inputs['endDate'])
        },
        totalCount:{
            $gte:parseInt(inputs['minCount']), $lt:parseInt(inputs['maxCount'])
        }
    }
    const collections2 = await client.db().collection('records').aggregate([
        {"$project":{"_id":0,"key":1,"createdAt":1,"totalCount":{"$sum":"$counts"}}},{"$match":query}]).toArray();
    
        return collections2;
  }

}

module.exports = ReportService;
