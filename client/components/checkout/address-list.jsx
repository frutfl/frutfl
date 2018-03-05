import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressContainer from './address-container.jsx';

//fetches addresses from database, maps over them and renders address containers, passing them one address each

class AddressList extends Component {

  // no longer working now that fetching has been moved upstream
  // componentDidMount() {
  //   console.log('addresslist:', this.props.addressList)
  //   if (this.props.addressList.length === 1) this.props.selectAddress(this.props.addressList[0].id);
  // }

  render() {
    return (
      <div>
        {this.props.addressList.map(address =>
          <AddressContainer key={address.id} address={address} selectAddress={this.props.selectAddress} selectedId={this.props.selectedId} />
        )}
      </div>
    );
  }
}

export default connect(null)(AddressList);
