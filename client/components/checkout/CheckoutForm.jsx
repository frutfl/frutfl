import React from 'react';
import { connect } from 'react-redux';
import {injectStripe, CardElement} from 'react-stripe-elements';

import { submitOrder } from '../../store/order';

class CheckoutForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const billingInfo = this.props.addressList.filter(address => address.id === this.props.billingId)[0];
    const tokenInfo = {
      type: 'card',
      name: billingInfo.name,
      address_line1: billingInfo.street,
      address_city: billingInfo.city,
      address_state: billingInfo.state,
      address_country: billingInfo.country,
    };
    this.props.stripe.createToken(tokenInfo).then(({token}) => {
      console.log('result is:', token);
      submitOrder({ cart: this.props.cart, token: token, shippingAddressId: this.props.shippingId, billingAddressId: this.props.billingId });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Pay With Card</h2>
        <label>
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
        <button>Pay ${this.props.cart.reduce((sum, item) =>
              sum + (item.product.price * item.quantity), 0).toFixed(2)}</button>
      </form>
    );
  }
}

const mapState = state => ({
  addressList: state.addresses.addressList,
  shippingId: state.addresses.shippingId,
  billingId: state.addresses.billingId,
  cart: state.cart,
});

export default injectStripe(connect(mapState)(CheckoutForm));
