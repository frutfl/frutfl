import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ADDRESSES = 'GET_ADDRESSES';
const ADD_ADDRESS = 'ADD_ADDRESS';
const EDIT_ADDRESS = 'EDIT_ADDRESS';
const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
const SET_SELECTED = 'SET_SELECTED';

/**
 * INITIAL STATE
 */
const defaultAddresses = {
  addressList: [],
  selectedId: null,
};

/**
 * ACTION CREATORS
 */
const getAddresses = addresses => ({
  type: GET_ADDRESSES,
  addresses,
});
const addAddress = address => ({
  type: ADD_ADDRESS,
  address,
});
const editAddress = address => ({
  type: EDIT_ADDRESS,
  address,
});
const removeAddress = address => ({
  type: REMOVE_ADDRESS,
  address,
});
export const setSelected = addressId => ({
  type: SET_SELECTED,
  addressId,
});

/**
 * THUNK CREATORS
 */
export const fetchAddresses = () =>
  dispatch =>
    axios.get('/api/addresses')
      .then(res => dispatch(getAddresses(res.data)))
      .catch(err => console.log(err));

export const postAddress = address =>
  dispatch =>
    axios.post('/api/addresses', address)
      .then(res => dispatch(addAddress(res.data)))
      .catch(err => console.log(err));

export const putAddress = address =>
  dispatch =>
    axios.put(`/api/addresses/${address.id}`, address)
      .then(res => dispatch(editAddress(res.data)))
      .catch(err => console.log(err));

export const deleteAddress = address =>
  dispatch =>
    axios.delete(`/api/addresses/${address.id}`)
      .then(() => dispatch(removeAddress(address)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultAddresses, action) {

  switch (action.type) {

    case GET_ADDRESSES:
      return {
        ...state,
        addressList: action.addresses,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addressList: [...state.addressList, action.address],
      };
    case EDIT_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map(address =>
          (address.id === action.address.id ? action.address : address)
        ),
      };
    case REMOVE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(address => address.id !== action.address.id),
      };
    case SET_SELECTED:
      return {
        ...state,
        selectedId: action.addressId,
      };
    default:
      return state;
  }
}
