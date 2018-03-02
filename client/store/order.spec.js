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
          expect(actions[0].type).to.be.equal('GET_ORDERS');
          expect(actions[0].orders).to.be.deep.equal(fakeOrders);
        });
    });
  });
});

describe('orders reducer', () => {
  const initialState = [];

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
      const action = {type: 'GET_ORDERS', orders: fakeOrders};
      expect(ordersReducer(initialState, action)).to.be.deep.equal(fakeOrders);
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
      const action = {type: 'DESTROY_ORDERS'};
      expect(ordersReducer(fakeOrders, action)).to.be.deep.equal([]);
    });
  });
});
