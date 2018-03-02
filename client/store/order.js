import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const DESTROY_ORDERS = 'DESTROY_ORDERS';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders});
export const destroyOrders = () => ({type: DESTROY_ORDERS});

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        if (res.data) dispatch(getOrders(res.data));
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case DESTROY_ORDERS:
      return defaultOrders;
    default:
      return state;
  }
}
