import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAddresses } from '../store/addresses';

//fetches addresses from database, maps over them and renders address containers, passing them one address each

class addressList extends Component {

  componentDidMount() {
    this.props.fetchAddresses();
  }

  render() {
    if (this.props.addresses) {
      return (
        <div>
          {this.props.addresses.map(address => <addressContainer key={address.id} address={address} />)}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapState = state => ({
  addresses: state.addresses,
});
const mapDispatch = dispatch => ({
  fetchAddresses: () => dispatch(fetchAddresses())
});

export default connect(mapState, mapDispatch)(addressList);
