import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_SELF = 'UPDATE_SELF';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const updateSelf = user => ({type: UPDATE_SELF, user});

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const auth = (email, password, method, name = null) => {
  let args = { email, password, name };
  return dispatch =>
    axios.post(`/auth/${method}`, args)
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
};

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

export const updateSelfOnServer = user => dispatch => {
    return axios.put(`/api/users/${user.id}`, user)
        .then(res => {
            dispatch(updateSelf(res.data));
        })
        .catch(err => console.log(err));
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_SELF:
      return action.user;
    default:
      return state;
  }
}
