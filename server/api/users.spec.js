/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
let agent = request.agent(app);
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        name: 'Cody',
        password: '123',
        email: codysEmail,
        accountType: 'ADMIN',
      })
      .then(() => {
        return User.create({
          name: 'Matt',
          password: '123',
          email: 'matt@gmail.com',
          accountType: 'USER',
        });
      });
    });

    afterEach(() => {
      agent = request.agent(app);
    });

    it('GET /api/users doesn\'t work for non admins', () => {
      return agent
        .get('/api/users')
        .expect(404)
        .then(() => {
          return agent
            .post('/auth/login')
            .send({ email: 'matt@gmail.com', password: '123' })
            .expect(200);
        })
        .then(() => {
          return agent
            .get('/api/users')
            .expect(404);
        });
    });
    it('GET /api/users only works for admins', () => {
      return agent
        .post('/auth/login')
        .send({ email: codysEmail, password: '123' })
        .expect(200)
        .then(() => {
          return agent
            .get('/api/users')
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
