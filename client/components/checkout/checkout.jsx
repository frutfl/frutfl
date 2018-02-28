import React from 'react';
import { connect } from 'react-redux';

import addressList from './address-list';

const checkout = props => {

  return (
    <div className="checkout">
      {/* <addressList /> */}

      <form action="your-server-side-code" method="POST">
        <script
          src="https://checkout.stripe.com/checkout.js" className="stripe-button"
          data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
          data-amount="999"
          data-name="Stripe.com"
          data-description="Example charge"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
          data-zip-code="true" />
      </form>
    </div>
  );
};

const mapState = state => ({
  cart: state.cart,
});

export default connect(null)(checkout);
