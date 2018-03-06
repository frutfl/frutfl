const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
let agent = request.agent(app);
const User = db.model('user');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/products/:id', () => {
    const codysEmail = 'cody@puppybook.com';
      const codysPassword = '123';
      let admin, user, item;
    beforeEach(() => {
      return User.create({
        name: 'Cody',
        password: codysPassword,
        email: codysEmail,
        accountType: 'ADMIN'
      })
      .then(created => { admin = created; })
      .then(() => {
        return User.create({
          name: 'Matt',
          password: '123',
          email: 'matt@gmail.com',
          accountType: 'USER'
        });
      })
            .then(created => { user = created; })
            .then(() => {
                return Product.create({
                    species: 'Apples',
                    variety: 'Braeburn',
                    organic: false,
                    price: 1.24,
                    inventory: 10,
                    unit: 'per pound',
                    isCurrentlyAvaialble: true
                })
                    .then(created => { item = created; });
            });

    });

    afterEach(() => {
      agent = request.agent(app);
    });

      it("PUT /api/products/:id doesn't work for non admins", () => {
          return agent
              .put('/api/products/1')
              .send({species: 'Oranges'})
              .expect(404)
              .then(() => {
                  return agent
                      .post('/auth/login')
                      .send({ email: 'matt@gmail.com', password: '123' })
                      .expect(200);
              })
              .then(() => {
                  return agent
                      .put('/api/products/1')
                      .send({species: 'Oranges'})
                      .expect(404);
              });
      });
      it('PUT /api/products/:id only works for admins', () => {
          return agent
              .post('/auth/login')
              .send({ email: codysEmail, password: codysPassword })
              .expect(200)
              .then(() => {
                  return agent
                      .put('/api/products/1')
                      .send({species: 'Oranges'})
                      .expect(200);
              })
              .then(res => {
                  let species = res.body[1][0].species;
                  expect(species).to.be.equal('Oranges');
              });
      });
  }); // end describe('/api/products/:id')
}); // end describe('User routes')
