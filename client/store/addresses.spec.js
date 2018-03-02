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
  }

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
      const fakeAddresses = [
        { name: 'name1', street: 'street1', city: 'city1', state: 'state1', country: 'country1', isActive: 'true', userId: 1 },
        { name: 'name2', street: 'street2', city: 'city2', state: 'state2', country: 'country2', isActive: 'true', userId: 2 }
      ];
      mockAxios.onGet('/api/addresses').replyOnce(200, fakeAddresses);
      return store.dispatch(fetchAddresses())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ADDRESSES');
          expect(actions[0].addresses).to.be.deep.equal(fakeAddresses);
        });
    });
  });
});
