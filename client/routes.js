import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, ResetPassword, Cart, Home, ProductPage, Orders, Users, Checkout} from './components';
import {me, readCartItemsFromStorage} from './store';

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  renderMainApp () {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/:id" component={ProductPage} />
        <Route path="/orders" component={Orders} />
        <Route path="/users" component={Users} />
        <Route path="/checkout" component={Checkout} />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }

  renderResetPassword() {
    return <ResetPassword />;
  }

  render () {
    const {user} = this.props;

    return user.shouldResetPassword
        ? this.renderResetPassword()
        : this.renderMainApp();


  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(readCartItemsFromStorage());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
