import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postAddress } from '../../store/addresses';

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
      this.state.editing ? <AddressEntry submit={this.props.postAddress} stopEditing={this.toggleEditing} /> : <button onClick={this.toggleEditing}>add address</button>
    );
  }
}

const mapDispatch = dispatch => ({
  postAddress: address => dispatch(postAddress(address))
});

export default connect(null, mapDispatch)(NewAddress);
