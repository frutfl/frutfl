import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAddresses } from '../../store/addresses';

import AddressContainer from './address-container.jsx';

//fetches addresses from database, maps over them and renders address containers, passing them one address each

class AddressList extends Component {

  componentDidMount() {
    this.props.fetchAddresses();
  }

  render() {
    if (this.props.addressList) {
      console.log('props addresses', this.props.addressList);
      return (
        <div>
          {this.props.addressList.map(address => <AddressContainer key={address.id} address={address} />)}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapState = state => ({
  addressList: state.addresses.addressList,
});
const mapDispatch = dispatch => ({
  fetchAddresses: () => dispatch(fetchAddresses())
});

export default connect(mapState, mapDispatch)(AddressList);
