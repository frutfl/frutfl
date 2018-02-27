/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import cartReducer, {
  readCartItemsFromStorage,
  writeCartItemToStorage,
  removeCartItemFromStorage,
  updateCartItemQuantityInStorage
} from './cart';
// import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
// import history from '../history';

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
    localStorage.clear();
  });

  describe('readCartItemsFromStorage', () => {
    it('reads from local storage', () => {
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
      expect(actions[0].items).to.be.deep.equal(cartItems);
    });
  });

  describe('writeCartItemToStorage', () => {
    it('writes to local storage', () => {
      const product = {
        id: 1,
        name: 'grape'
      };
      const quantity = 1;

      store.dispatch(writeCartItemToStorage(product, quantity));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_CART_ITEM');
      expect(actions[0].item).to.be.deep.equal({product, quantity});

      const storage = JSON.parse(localStorage.getItem('cart'));
      expect(storage).to.be.deep.equal([{product, quantity}]);
    });
  });

  describe('removeCartItemFromStorage', () => {
    it('removes item from storage', () => {
      const cartItems = [
        {
          product: {
            id: 1,
            name: 'grape'
          },
          quantity: 1
        },
        {
          product: {
            id: 2,
            name: 'apple'
          },
          quantity: 1
        }
      ];
      localStorage.setItem('cart', JSON.stringify(cartItems));

      store.dispatch(removeCartItemFromStorage(cartItems[1].product));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('REMOVE_CART_ITEM');
      expect(actions[0].product).to.be.deep.equal(cartItems[1].product);

      const items = JSON.parse(localStorage.getItem('cart'));
      expect(items).to.be.deep.equal([cartItems[0]]);
    });
  });

  describe('updateCartItemQuantity', () => {
    it('updates quantity in storage', () => {
      const cartItems = [
        {
          product: {
            id: 1,
            name: 'grape'
          },
          quantity: 1
        },
        {
          product: {
            id: 2,
            name: 'apple'
          },
          quantity: 1
        }
      ];
      const newQuantity = 2;
      localStorage.setItem('cart', JSON.stringify(cartItems));

      store.dispatch(updateCartItemQuantityInStorage(
        cartItems[1].product, newQuantity));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_CART_QUANTITY');
      expect(actions[0].item).to.be.deep.equal({
        product: cartItems[1].product,
        quantity: newQuantity
      });

      const items = JSON.parse(localStorage.getItem('cart'));
      expect(items).to.be.deep.equal([
        cartItems[0],
        {
          product: cartItems[1].product,
          quantity: newQuantity
        }
      ]);
    });
  });
});

describe('cart reducer', () => {
  const initialState = [];

  describe('GET_CART_ITEMS action', () => {
    it('returns appropriate value', () => {
      const cartItems = [{
        product: {
          id: 1,
          name: 'grape'
        },
        quantity: 1
      }];
      const action = {type: 'GET_CART_ITEMS', items: cartItems};
      expect(cartReducer(initialState, action)).to.be.deep.equal(cartItems);
    });
  });

  describe('ADD_CART_ITEM action', () => {
    it('returns appropriate value', () => {
      const state = [{
        product: {
          id: 1,
          name: 'grape'
        },
        quantity: 1
      }];

      const product = {
        id: 2,
        name: 'apple'
      };
      const quantity = 1;
      const action = { type: 'ADD_CART_ITEM', item: { product, quantity }};
      expect(cartReducer(state, action)).to.be.deep.equal(
        [...state, {product, quantity}]
      );
    });
  });

  describe('REMOVE_CART_ITEM action', () => {
    it('returns appropriate value', () => {
      const state = [
        {
          product: {
            id: 1,
            name: 'grape'
          },
          quantity: 1
        },
        {
          product: {
            id: 2,
            name: 'apple'
          },
          quantity: 1
        }
      ];

      const action = { type: 'REMOVE_CART_ITEM', product: state[1].product};
      expect(cartReducer(state, action)).to.be.deep.equal(
        [state[0]]
      );
    });
  });

  describe('UPDATE_CART_QUANTITY action', () => {
    it('returns appropriate value', () => {
      const state = [
        {
          product: {
            id: 1,
            name: 'grape'
          },
          quantity: 1
        },
        {
          product: {
            id: 2,
            name: 'apple'
          },
          quantity: 1
        }
      ];
      const newQuantity = 2;

      const action = {
        type: 'UPDATE_CART_QUANTITY',
        item: {
          product: state[1].product,
          quantity: newQuantity
        }
      };
      expect(cartReducer(state, action)).to.be.deep.equal(
        [
          state[0],
          {
            product: state[1].product,
            quantity: newQuantity
          }
        ]
      );
    });
  });
});
