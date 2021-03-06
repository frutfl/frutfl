import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressList from './address-list.jsx';
import NewAddress from './new-address.jsx';
import BillingAddressSection from './billing-address-section.jsx';
import MyStoreCheckout from './MyStoreCheckout.jsx';

import { fetchAddresses, selectShipping, selectBilling } from '../../store/addresses';

class Checkout extends Component {

  componentDidMount() {
    this.props.fetchAddresses();
  }
  render() {
    return (
      <div className="checkout">
      <h2>Total ${this.props.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}</h2>
        <h2>Shipping Address</h2>
        <AddressList addressList={this.props.addressList} selectAddress={this.props.selectShipping} selectedId={this.props.shippingId} />
        <NewAddress addressType="SHIPPING" />
        {this.props.shippingId ? <BillingAddressSection addressList={this.props.addressList} selectAddress={this.props.selectBilling} shippingId={this.props.shippingId} billingId={this.props.billingId} /> : <h2>Select a shipping address to continue to billing</h2>}
        {this.props.billingId ? <MyStoreCheckout /> : null}
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
  addressList: state.addresses.addressList,
  shippingId: state.addresses.shippingId,
  billingId: state.addresses.billingId,
});
const mapDispatch = dispatch => ({
  fetchAddresses: () => dispatch(fetchAddresses()),
  selectShipping: addressId => dispatch(selectShipping(addressId)),
  selectBilling: addressId => dispatch(selectBilling(addressId)),
});

export default connect(mapState, mapDispatch)(Checkout);
