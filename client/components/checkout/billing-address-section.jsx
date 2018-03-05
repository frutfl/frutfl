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
    if (choice) this.props.setAsBillingAddress();
  }
  render() {
    if (this.state.sameBillingasShipping === null) {
      return <ChooseBilling choose={this.makeChoice} />;
    } else if (this.state.sameBillingasShipping === true) {
      return (<AddressList addressList={this.props.addressList.filter(address => {
        return true;//address.id === this.props.billingId;
      })} />);
    } else if (this.state.sameBillingasShipping === false) {
      return (
        <div>
          <AddressList addressList={this.props.addressList} selectAddress={this.props.selectAddress} />
          <NewAddress addressType="BILLING" />
        </div>
      )
    }
  }
}

const mapDispatch = (dispatch, OwnProps) => ({
  setAsBillingAddress: () => dispatch(putAddress({ id: OwnProps.shippingId, isBilling: true })).then(() => dispatch(setShippingAsBilling()))
});

export default connect(null, mapDispatch)(BillingAddressSection);
