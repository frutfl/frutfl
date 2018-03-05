import React from 'react';
import { connect } from 'react-redux';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  handleSubmit = (event) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();
    console.log('event data:', event);
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'}).then(result => console.log('result is:', result));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        {this.props.children || null}
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
        <button>Confirm order</button>
      </form>
    );
  }
}

const mapState = state => ({
  addressId: state.addresses.selectedId,
});

export default injectStripe(connect(mapState)(CheckoutForm));
