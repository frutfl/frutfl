import React, { Component } from 'react';
import { connect } from 'react-redux';

//fetches addresses from database, maps over them and renders address containers, passing them one address each

class addressList extends Component {

  componentDidMount() {
    console.log(this);
    //dispatch - fetch addresses (which will be passed back in as props)
  }

  render() {
    console.log(this);
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

export default connect(mapState)(addressList);
