import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postAddress, selectShipping, selectBilling } from '../../store/addresses';

import AddressEntry from './address-entry.jsx';

class NewAddress extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    return (
      this.state.editing ? <AddressEntry submit={this.props[`post${this.props.addressType}`]} stopEditing={this.toggleEditing} /> : <button onClick={this.toggleEditing}>add address</button>
    );
  }
}

const mapDispatch = dispatch => ({
  postSHIPPING: address => dispatch(postAddress({ ...address, isShipping: true })).then(newAddress => dispatch(selectShipping(newAddress.id))),
  postBILLING: address => dispatch(postAddress({ ...address, isBilling: true })).then(newAddress => dispatch(selectBilling(newAddress.id)))
});

export default connect(null, mapDispatch)(NewAddress);
