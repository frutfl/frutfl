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
    let admin, user;
    beforeEach(() => {
      return User.create({
        name: 'Cody',
        password: '123',
        email: codysEmail,
        accountType: 'ADMIN',
      })
      .then(created => { admin = created; })
      .then(() => {
        return User.create({
          name: 'Matt',
          password: '123',
          email: 'matt@gmail.com',
          accountType: 'USER',
        });
      })
      .then(created => { user = created; });
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
    it('PUT /api/users to change isActive makes so changed user can\'t access logged-in content',
    () => {
      let agentAdmin = request.agent(app);
      return agent
        .post('/auth/login')
        .send({ email: user.email, password: '123' })
        .expect(200)
        .then(() => {
          return agent
            .get('/api/orders')
            .expect(200);
        })
        .then(() => {
          return agentAdmin
            .post('/auth/login')
            .send({ email: admin.email, password: '123' })
            .expect(200);
        })
        .then(() => {
          return agentAdmin
            .put(`/api/users/${user.id}`)
            .send({ isActive: false })
            .expect(200);
        })
        .then(() => {
          return agent
            .get('/api/orders')
            .expect(404);
        });
    });
    it('PUT /api/user allows user to update themself', () => {
      return agent
        .post('/auth/login')
        .send({ email: user.email, password: '123' })
        .expect(200)
        .then(() => {
          return agent
            .put(`/api/users/${user.id}`)
            .send({ password: '456' })
            .expect(200);
        })
        .then(() => {
          return User.findById(user.id)
          .then(updatedUser => {
            expect(updatedUser.correctPassword('123')).to.be.equal(false);
            expect(updatedUser.correctPassword('456')).to.be.equal(true);
          });
        })
        .then(() => {
          return agent
            .put(`/api/users/${admin.id}`)
            .send({ password: '456' })
            .expect(404);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
