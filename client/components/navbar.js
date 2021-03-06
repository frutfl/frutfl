import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div className="navlinks">
          {/* The navbar will show these links after you log in */}
          <Link to="/home"><img src="/images/FRUTFL-logo.png" /></Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {
            isAdmin ? (
              <Link to="/users">Users</Link>
            )
            : null }
          <Link to="/orders">Orders</Link>
        </div>
      ) : (
        <div className="navlinks">
          {/* The navbar will show these links before you log in */}
          <Link to="/home"><img src="/images/FRUTFL-logo.png" /></Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {/* The navbar will show these links whether or not the user is logged in */ }
      <div className="cart-link">
        <Link to="/cart">Shopping Cart</Link>
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.accountType === 'ADMIN'
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
