import React, { Component } from 'react';
import { connect } from 'react-redux';

import { putAddress } from '../../store/addresses';

import AddressInfo from './address-info.jsx';
import AddressEntry from './address-entry.jsx';

class AddressContainer extends Component {

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
      this.state.editing ? <AddressEntry address={this.props.address} submit={this.props.updateAddress} stopEditing={this.toggleEditing} /> : <AddressInfo address={this.props.address} edit={this.toggleEditing} selectAddress={this.props.selectAddress} selectedId={this.props.selectedId} />
    );
  }
}

const mapDispatch = dispatch => ({
  updateAddress: address => dispatch(putAddress(address))
});

export default connect(null, mapDispatch)(AddressContainer);
