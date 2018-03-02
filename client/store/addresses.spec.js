import {expect} from 'chai';
import addressesReducer, { fetchAddresses, postAddress, putAddress, deleteAddress } from './addresses';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {
    addresses: {
      addressList: [],
      selectedId: null,
    }
  };

  const fakeAddresses = [
    { id: 1, name: 'name1', street: 'street1', city: 'city1', state: 'state1', country: 'country1', isActive: 'true', userId: 1 },
    { id: 2, name: 'name2', street: 'street2', city: 'city2', state: 'state2', country: 'country2', isActive: 'true', userId: 2 }
  ];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchAddresses', () => {
    it('dispatches GET_ADDRESSES', () => {
      mockAxios.onGet('/api/addresses').replyOnce(200, fakeAddresses);
      return store.dispatch(fetchAddresses())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ADDRESSES');
          expect(actions[0].addresses).to.be.deep.equal(fakeAddresses);
        });
    });
  });

  describe('postAddresses', () => {
    it('dispatches ADD_ADDRESS', () => {
      const newAddress = { id: 3, name: 'name3', street: 'street3', city: 'city3', state: 'state3', country: 'country3', isActive: 'true', userId: 3 };
      mockAxios.onPost('/api/addresses').replyOnce(200, newAddress);
      return store.dispatch(postAddress())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('ADD_ADDRESS');
          expect(actions[0].address).to.be.deep.equal(newAddress);
        });
    });
  });

  describe('putAddress', () => {
    it('dispatches EDIT_ADDRESS', () => {
      const updatedAddress = { id: 4, name: 'name4', street: 'street4', city: 'city4', state: 'state4', country: 'country4', isActive: 'true', userId: 4 };
      mockAxios.onPut('/api/addresses/4').replyOnce(200, updatedAddress);
      return store.dispatch(putAddress(updatedAddress))
        .then(() => {
          const actions = store.getActions();
          console.log('ACTIONS ARE:', actions)
          expect(actions[0].type).to.be.equal('EDIT_ADDRESS');
          expect(actions[0].address).to.be.deep.equal(updatedAddress);
        });
    });
  });

  describe('deleteAddress', () => {
    it('dispatches REMOVE_ADDRESS', () => {
      const toBeDeleted = { id: 5, name: 'name5', street: 'street5', city: 'city5', state: 'state5', country: 'country5', isActive: 'true', userId: 5 };
      mockAxios.onDelete('/api/addresses/5').replyOnce(204);
      return store.dispatch(deleteAddress(toBeDeleted))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_ADDRESS');
          expect(actions[0].address).to.be.deep.equal(toBeDeleted);
        });
    });
  });
});

// describe('addresses reducer', () => {

//   const fakeAddresses = [
//     { id: 1, name: 'name1', street: 'street1', city: 'city1', state: 'state1', country: 'country1', isActive: 'true', userId: 1 },
//     { id: 2, name: 'name2', street: 'street2', city: 'city2', state: 'state2', country: 'country2', isActive: 'true', userId: 2 }
//   ];

//   describe('GET_ADDRESSES', () => {
//     it('returns addresses', () => {

//     })
//   })
// })
