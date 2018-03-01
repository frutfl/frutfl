import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';

/**
 * COMPONENT
 */

function renderAdditionalSignupFields() {
  return (
    <div>
      <label htmlFor="userName"><small>Name</small></label>
      <input name="userName" type="text" />
    </div>
  );
}

const AuthForm = (props) => {
  const {formName, displayName, handleSubmit, error} = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={formName}>
        { formName === 'signup' && renderAdditionalSignupFields() }
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div><a href="/auth/google">{displayName} with Google</a></div>
      <div><a href="/auth/facebook">{displayName} with Facebook</a></div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    formName: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    formName: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapLoginDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

const mapSignupDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const userName = evt.target.userName.value;
      dispatch(auth(email, password, formName, userName));
    }
  };
};

export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  formName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
