import React from 'react';
import {connect} from 'react-redux';
import CartItem from './cart-item';
import {Link} from 'react-router-dom';

const Cart = ({cartItems}) => {
  function renderShoppingCart() {
    return (
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr className="cart-card">
              <th />
              <th />
              <th>Quantity</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <tr className="cart-card">
              <td />
              <td />
              <td className="total-cell"><strong>Total</strong></td>
              <td>
                <strong>
                  ${
                    cartItems.reduce((sum, item) =>
                      sum + (item.product.price * item.quantity), 0).toFixed(2)
                  }
                </strong>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <Link to="/checkout">
          <button className="cart-checkout-button">Proceed to checkout</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {
        cartItems.length > 0 ?
        renderShoppingCart() :
        <h3>No items in shopping cart</h3>
      }
    </div>
  );
};


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
