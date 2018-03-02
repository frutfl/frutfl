import React from 'react';
import { connect } from 'react-redux';

import AddressList from './address-list.jsx';
import NewAddress from './new-address.jsx';

const checkout = props => {

  return (
    <div className="checkout">
      <AddressList />
      <NewAddress />
    </div>
  );
};

const mapState = state => ({
  cart: state.cart,
});

export default connect(mapState)(checkout);
