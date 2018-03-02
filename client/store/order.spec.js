/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import ordersReducer, {fetchOrders} from './order';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {order: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchOrders', () => {
    it('eventually dispatches the GET_ORDERS action', () => {
      const fakeOrders = [
        {
          status: 'CREATED',
          id: 1
        },
        {
          status: 'CREATED',
          id: 2
        }
      ];
      mockAxios.onGet('/api/orders').replyOnce(200, fakeOrders);
      return store.dispatch(fetchOrders())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('FETCHING_ORDERS');
          expect(actions[1].type).to.be.equal('GET_ORDERS');
          expect(actions[1].orders).to.be.deep.equal(fakeOrders);
          expect(actions[2].type).to.be.equal('FETCHED_ORDERS');
        });
    });
  });
});

describe('orders reducer', () => {

  describe('GET_ORDERS action', () => {
    it('returns appropriate value', () => {
      const fakeOrders = [
        {
          status: 'CREATED',
          id: 1
        },
        {
          status: 'CREATED',
          id: 2
        }
      ];
      const initialState = {
        orders: [],
        fetching: false
      };
      const action = {type: 'GET_ORDERS', orders: fakeOrders};
      const result = ordersReducer(initialState, action);
      expect(result.orders).to.be.deep.equal(fakeOrders);
      expect(result.fetching).to.be.equal(false);
    });
  });

  describe('DESTROY_ORDERS action', () => {
    it('returns appropriate value', () => {
      const fakeOrders = [
        {
          status: 'CREATED',
          id: 1
        },
        {
          status: 'CREATED',
          id: 2
        }
      ];
      const initialState = {
        orders: fakeOrders,
        fetching: false
      };
      const action = {type: 'DESTROY_ORDERS'};
      const result = ordersReducer(initialState, action);
      expect(result.orders).to.be.deep.equal([]);
      expect(result.fetching).to.be.equal(false);
    });
  });

  describe('FETCHING_ORDERS action', () => {
    it('returns appropriate value', () => {
      const fakeOrders = [
        {
          status: 'CREATED',
          id: 1
        },
        {
          status: 'CREATED',
          id: 2
        }
      ];
      const initialState = {
        orders: fakeOrders,
        fetching: false
      };
      const action = {type: 'FETCHING_ORDERS'};
      const result = ordersReducer(initialState, action);
      expect(result.orders).to.be.deep.equal(fakeOrders);
      expect(result.fetching).to.be.equal(true);
    });
  });

  describe('FETCHED_ORDERS action', () => {
    it('returns appropriate value', () => {
      const fakeOrders = [
        {
          status: 'CREATED',
          id: 1
        },
        {
          status: 'CREATED',
          id: 2
        }
      ];
      const initialState = {
        orders: fakeOrders,
        fetching: true
      };
      const action = {type: 'FETCHED_ORDERS'};
      const result = ordersReducer(initialState, action);
      expect(result.orders).to.be.deep.equal(fakeOrders);
      expect(result.fetching).to.be.equal(false);
    });
  });
});
