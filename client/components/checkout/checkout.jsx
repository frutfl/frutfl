import React from 'react';
import { connect } from 'react-redux';

import AddressList from './address-list.jsx';

const checkout = props => {

  return (
    <div className="checkout">
      <AddressList />

    </div>
  );
};

const mapState = state => ({
  cart: state.cart,
});

export default connect(null)(checkout);
