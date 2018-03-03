import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers, updateUserOnServer} from '../store';

class Users extends Component {
  constructor() {
    super();

    this.handleAccountTypeChange = this.handleAccountTypeChange.bind(this);
    this.handleIsActiveChange = this.handleIsActiveChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleAccountTypeChange(user) {
    return function(event) {
      user.accountType = event.target.value;
      this.props.updateUserOnServer(user);
    }.bind(this);
  }

  handleIsActiveChange(user) {
    return function(event) {
      user.isActive = event.target.value;
      this.props.updateUserOnServer(user);
    }.bind(this);
  }

  render() {
    const users = this.props.users;
    return (
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Active Status</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      onChange={this.handleAccountTypeChange(user)}
                      value={user.accountType}>
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      onChange={this.handleIsActiveChange(user)}
                      value={user.isActive}>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}



/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.users
  };
};

const mapDispatch = { fetchAllUsers, updateUserOnServer };

export default connect(mapState, mapDispatch)(Users);
