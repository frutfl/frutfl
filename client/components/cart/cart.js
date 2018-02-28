import React from 'react';
import {connect} from 'react-redux';
import CartItem from './cart-item';
import {Link} from 'react-router-dom';

const Cart = ({cartItems}) => {
  function renderShoppingCart() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </tbody>
        </table>
        <div>
          ${
            cartItems.reduce((sum, item) =>
              sum + (item.product.price * item.quantity), 0).toFixed(2)
          }
        </div>
        <Link to="/checkout">
          <button>Proceed to checkout</button>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <h1>Shopping cart</h1>
      {
        cartItems.length > 0 ?
        renderShoppingCart() :
        <h3>No items in shopping cart</h3>
      }
    </div>
  )
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cartItems: state.cart
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
