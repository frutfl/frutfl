import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewAddress from './new-address.jsx';
import AddressList from './address-list.jsx';
import ChooseBilling from './choose-billing.jsx';
import MyStoreCheckout from './MyStoreCheckout.jsx';

import { putAddress, setShippingAsBilling } from '../../store/addresses';

class BillingAddressSection extends Component {

  constructor(props) {
    super(props);
    this.state = { sameBillingasShipping: null };
    this.makeChoice = this.makeChoice.bind(this);
  }

  makeChoice(choice) {
    console.log('making choice');
    this.setState({ sameBillingasShipping: choice });
    if (choice) this.props.setShippingAsBilling();
  }
  render() {

    return (
      <div>
        <h2>Billing Address</h2>
        {this.state.sameBillingasShipping === null ?
          <ChooseBilling choose={this.makeChoice} /> : null}
        {this.state.sameBillingasShipping === true ?
          <AddressList addressList={this.props.addressList.filter(address => address.id === this.props.shippingId)} selectAddress={this.props.selectAddress} selectedId={this.props.billingId} /> : null}
        {this.state.sameBillingasShipping === false ?
          (<div>
            <AddressList addressList={this.props.addressList.filter(address => address.id !== this.props.shippingId)} selectAddress={this.props.selectAddress} selectedId={this.props.billingId} />
            <NewAddress addressType="BILLING" />
          </div>) : null}
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  setShippingAsBilling: () => dispatch(setShippingAsBilling())
});

export default connect(null, mapDispatch)(BillingAddressSection);
