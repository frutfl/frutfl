/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {
  readCartItemsFromStorage,
  writeCartItemToStorage,
  removeCartItemFromStorage,
  updateCartItemQuantityInStorage
} from './cart';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;

  const initialState = {cart: []};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('readCartItemsFromStorage', () => {
    it('reads from local storage and updates store', () => {
      const cartItems = [{
        product: {
          id: 1,
          name: 'grape'
        },
        quantity: 1
      }];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      store.dispatch(readCartItemsFromStorage());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_CART_ITEMS');
      const state = store.getState();
      expect(state.cart[0].product.id).to.equal(cartItems[0].product.id);
      expect(state.cart[0].quantity).to.equal(cartItems[0].quantity);
    });
  });
});
