/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as Home} from './home.jsx';
export {default as Cart} from './cart/cart';
export {default as ProductPage} from './singleProduct.jsx';
export {default as Orders} from './orders';
export {default as Users} from './users';
export {default as Checkout} from './checkout/checkout.jsx';
