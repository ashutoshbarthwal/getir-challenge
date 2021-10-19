require('module-alias/register')

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const { messages } = require('@config/errors');
const server = require('@app/bootstrap/app');
const preTestSetup = require('@tests/tasks/preTestSetup');
const postTestSetup = require('@tests/tasks/postTestSetup');

chai.use(chaiHttp);

describe('Records', () => {

  /**
   * pre setup task
   */
  before(async () => {
    await preTestSetup();
  });

  /**
   * post test tasks
   */
  after(async () => {
    await postTestSetup();
  })

  /*
   * Test the /POST records
   */
  describe('POST /records', () => {
    it('it should return non empty list of records', (done) => {
      let inputs = {
        startDate:"2016-01-01",
        endDate:"2016-02-01",
        maxCount:200,
        minCount:162
    }
    
      chai.request(server)
        .post('/api/v1/records')
        .send(inputs)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(0);
          done();
        });
    });

    it('it should return with validation error', (done) => {
      let inputs = {
        startDate:"2016-01-",
        endDate:"2016-02-01",
        maxCount:"abvc",
        minCount:162
    }
    
      chai.request(server)
        .post('/api/v1/records')
        .send(inputs)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(422);
          done();
        });
    });
  });




});
