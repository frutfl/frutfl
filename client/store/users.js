import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUsers = [];

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users});
const updateUser = user => ({type: UPDATE_USER, user });

/**
 * REDUCER
 */
export default function (state = defaultUsers, action){
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === action.user.id) {
          return action.user;
        } else {
          return user;
        }
      });
    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => dispatch => {
    axios.get('/api/users')
        .then(users => users.data)
        .then(usersData => {
            dispatch(getAllUsers(usersData));
        })
        .catch(err => console.log(err));
};

export const updateUserOnServer = user => dispatch => {
    axios.put(`/api/users/${user.id}`, user)
        .then(() => {
            dispatch(updateUser(user));
        })
        .catch(err => console.log(err));
};
