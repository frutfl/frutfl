/**
 * ACTION TYPES
 */
const GET_CART_ITEMS = 'GET_CART_ITEMS';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_QUANTITY';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */

// Cart consists of items, and each item is comprised of a product and quantity
const getCartItems = items => ({type: GET_CART_ITEMS, items});
const addCartItem = (product, quantity) => ({type: ADD_CART_ITEM, item: {product, quantity}});
const removeCartItem = product => ({type: REMOVE_CART_ITEM, product});
const updateCartItemQuantity = (product, quantity) =>
  ({type: UPDATE_CART_ITEM_QUANTITY, item: {product, quantity}});

/**
 * THUNK CREATORS
 */
export const readCartItemsFromStorage = () =>
  dispatch => {
    const items = JSON.parse(localStorage.getItem('cart'));
    dispatch(getCartItems(items));
  };

export const writeCartItemToStorage = (product, quantity) =>
  dispatch => {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.push({product, quantity});
    localStorage.setItem('cart', JSON.stringify(items));
    dispatch(addCartItem(product, quantity));
  };

export const removeCartItemFromStorage = product =>
  dispatch => {
    let items = JSON.parse(localStorage.getItem('cart'));
    items = items.filter(item => item.product.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(items));
    dispatch(removeCartItem(product));
  };

export const updateCartItemQuantityInStorage = (product, quantity) =>
  dispatch => {
    let items = JSON.parse(localStorage.getItem('cart'));

    items = items.map(item => {
      if (item.product.id === product.id) {
        return {product, quantity};
      } else {
        return item;
      }
    });

    localStorage.setItem('cart', JSON.stringify(items));
    dispatch(updateCartItemQuantity(product, quantity));
  };

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.items;
    case ADD_CART_ITEM:
      return [...state, action.item];
    case REMOVE_CART_ITEM:
      return state.filter(item => item.product.id !== action.product.id);
    case UPDATE_CART_ITEM_QUANTITY:
      return state.map(item => {
        if (item.product.id === action.item.product.id) {
          return action.item;
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}
