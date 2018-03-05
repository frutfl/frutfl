import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import users from './users';
import cart from './cart';
import order from './order';
import products from './products';
import addresses from './addresses';
import category from './category';
const reducer = combineReducers({user, users, cart, order, products, addresses, category});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './users';
export * from './cart';
export * from './order';
export * from './products';
export * from './category';
