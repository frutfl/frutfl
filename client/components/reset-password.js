import React from 'react';
import {connect} from 'react-redux';
import {updateSelfOnServer} from '../store';

function handleSubmit(user, updateSelf, me) {
  return function (evt) {
    evt.preventDefault();
    user.password = evt.target.password.value;
    user.shouldResetPassword = false;
    updateSelf(user)
    .then(() => me());
  }
}

const ResetPassword = (props) => {
  const { user, updateSelf } = props;
  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(user, updateSelf)} name="password reset">
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="text" />
        </div>
        <div>
          <button type="submit">Reset Passwoord</button>
        </div>
      </form>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = { updateSelf: updateSelfOnServer };

export default connect(mapState, mapDispatch)(ResetPassword);
