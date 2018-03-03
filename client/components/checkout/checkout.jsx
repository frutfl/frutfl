import React from 'react';
import { connect } from 'react-redux';

import AddressList from './address-list.jsx';
import NewAddress from './new-address.jsx';
import MyStoreCheckout from './MyStoreCheckout.jsx';

const checkout = props => {
  console.log('incoming props:', props);
  return (
    <div className="checkout">
      <AddressList />
      <NewAddress />
      <MyStoreCheckout />
    </div>
  );
};

const mapState = state => ({
  cart: state.cart,
});

export default connect(mapState)(checkout);
