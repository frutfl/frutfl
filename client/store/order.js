import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const DESTROY_ORDERS = 'DESTROY_ORDERS';
const FETCHING_ORDERS = 'FETCHING_ORDERS';
const FETCHED_ORDERS = 'FETCHED_ORDERS';

/**
 * INITIAL STATE
 */
const defaultOrders = {
  orders: [],
  fetching: false
}

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders});
export const destroyOrders = () => ({type: DESTROY_ORDERS});
const fetchingOrders = () => ({type: FETCHING_ORDERS});
const fetchedOrders = () => ({type: FETCHED_ORDERS});

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch => {
    dispatch(fetchingOrders());
    return axios.get('/api/orders')
      .then(res => {
        if (res.data) dispatch(getOrders(res.data));
        dispatch(fetchedOrders());
      })
      .catch(err => console.log(err));
    }

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        orders: action.orders,
        fetching: state.fetching
      };
    case DESTROY_ORDERS:
      return defaultOrders;
    case FETCHING_ORDERS:
      return {
        orders: state.orders,
        fetching: true
      }
    case FETCHED_ORDERS:
      return {
        orders: state.orders,
        fetching: false
      }
    default:
      return state;
  }
}
