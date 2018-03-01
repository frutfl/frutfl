import React, { Component } from 'react';
import { connect } from 'react-redux';

//gets an address from props, renders either address info or editing form based on what user wants, passing through the address and passing in the toggleEditing function

class addressContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    console.log(this);
    return (
      this.state.editing ? <addressEntry address={this.props.address} stopEditing={this.toggleEditing} /> : <addressInfo address={this.props.address} edit={this.toggleEditing} />
    );
  }
}

export default addressContainer;