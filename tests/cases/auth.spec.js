require('module-alias/register')

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const bcrypt = require('bcryptjs');
const chaiHttp = require('chai-http');

const { messages } = require('@config/errors');
const server = require('@app/bootstrap/app');
const User = require('@app/models').User;
const UserService = require('@app/services/UserService');
const preTestSetup = require('@tests/tasks/preTestSetup');
const postTestSetup = require('@tests/tasks/postTestSetup');

const userService = new UserService;

chai.use(chaiHttp);

describe('User', () => {

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
   * Test the /POST login
   */
  describe('POST /auth/login', () => {
    it('it should login with error', (done) => {
      let inputs = {
        email: `test${(new Date).getTime()}@test.com`,
        password: "testing"
      }

      chai.request(server)
        .post('/api/v1/auth/login')
        .send(inputs)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql(messages.invalid_credentials);
          done();
        });
    });
  });

  /*
   * Test the /POST login
   */
  describe('POST /auth/login', () => {
    it('it should login without error', (done) => {
      const inputs = {
        name: "Tester",
        email: `test+${(new Date).getTime()}@test.com`,
        password: "testing"
      };

      bcrypt.hash(inputs.password, 12)
        .then(password => {
          return User.create({
            first_name: inputs.first_name,
            email: inputs.email,
            password
          })
        })
        .then(() => {
          chai.request(server)
            .post('/api/v1/auth/login')
            .send({
              email: inputs.email,
              password: inputs.password
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code').eql(200);
              res.body.should.have.property('data');
              res.body.data.should.have.property('token');
              done();
            });
        })
    });
  });

     /*
   * Test the /GET profile
   */
  describe('GET /auth/profile', () => {
    it('it should get user profile', (done) => {
      const inputs = {
        first_name: "Tester",
        last_name: "Testing",
        email: "test@test.com",
        password: "testing"
      };

      bcrypt.hash(inputs.password, 12)
        .then(password => {
          return User.create({
            first_name: inputs.first_name,
            last_name: inputs.last_name,
            email: inputs.email,
            password,
          })
        })
        .then(user => {
          const token = userService.generateJWTFromData({
            id: user.id,
          });

          return token;
        })
        .then(token => {
          chai.request(server)
            .get('/api/v1/auth/profile')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code').eql(200);
              res.body.should.have.property('data');
              res.body.data.user.should.have.property('last_name').eql(inputs.last_name);
              done();
            });
        })
    });
  });


});
