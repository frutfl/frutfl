/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../db');
const app = require('../index');
const request = require('supertest');
let agent = request.agent(app);
const {Order, OrderItem, User, Product} = require('../db/models');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/orders/', () => {
    let admin, user;
    let order1, order2;
    let orderItem1, orderItem2;
    let product;

    beforeEach(() => {
      return Promise.all([
        User.create({
          name: 'Cody',
          email: 'cody@gmail.com',
          password: '123',
          accountType: User.ACCOUNT_TYPES.USER,
        })
        .then(result => { user = result; }),
        User.create({
          name: 'Matthew',
          email: 'matthew@gmail.com',
          password: '123',
          accountType: User.ACCOUNT_TYPES.ADMIN,
        })
        .then(result => { admin = result; })
      ])
      .then(() => {
        return Order.create({
          status: Order.STATUSES.CREATED,
          userId: user.id
        })
        .then(order => { order1 = order; })
        .then(() => {
          return Order.create({
            status: Order.STATUSES.CREATED,
            userId: admin.id
          })
            .then(order => { order2 = order; })
        })
      })
      .then(() => {
        return Product.create({
          species: 'Apple',
          price: 0.89,
          inventory: 5,
          unit: 'single',
        })
        .then(result => { product = result; });
      })
      .then(() => {
        return Promise.all([
          OrderItem.create({
            quantity: 1,
            price: 0.89,
            orderId: order1.id,
            productId: product.id
          })
          .then(orderItem => { orderItem1 = orderItem; }),
          OrderItem.create({
            quantity: 1,
            price: 1.12,
            orderId: order2.id,
            productId: product.id
          })
          .then(orderItem => { orderItem2 = orderItem; })
        ]);
      });
    });

    afterEach(() => {
      agent = request.agent(app);
    });

    it('returns 404 for unauthenticated user ', () => {
      return agent
        .get('/api/orders')
        .expect(404);
    });

    it('returns all orders for admin user', () => {
      return agent
        .post('/auth/login')
        .send({ email: admin.email, password: '123' })
        .expect(200)
      .then(() => {
        return agent
          .get('/api/orders')
          .expect(200);
      })
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);

        expect(res.body[0].orderItems).to.be.an('array');
        expect(res.body[0].orderItems[0].price).to.equal(orderItem2.price);
        expect(res.body[0].orderItems[0].product.species)
          .to.equal(product.species);

        expect(res.body[1].orderItems).to.be.an('array');
        expect(res.body[1].orderItems[0].price).to.equal(orderItem1.price);
        expect(res.body[1].orderItems[0].product.species)
          .to.equal(product.species);
      });
    });

    it('only returns a user\'s orders for a given user', () => {
      return agent
        .post('/auth/login')
        .send({ email: user.email, password: '123' })
        .expect(200)
      .then(() => {
        return agent
          .get('/api/orders')
          .expect(200);
      })
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);

        expect(res.body[0].orderItems).to.be.an('array');
        expect(res.body[0].orderItems[0].price).to.equal(orderItem1.price);
        expect(res.body[0].orderItems[0].product.species)
          .to.equal(product.species);
      });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
