import axios from 'axios';

import * as types from './actionTypes'

export const authStart = () => (
  { type: types.AUTH_START}
);

export const authSuccess = (data) => (
  {
    type: types.AUTH_SUCCESS,
    data: data
  }
);

export const authFail = (err) => (
  {
    type: types.AUTH_FAIL,
    error: err
  }
);

export const auth = (email, password) => (
  dispatch => {
    dispatch(authStart());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBLuagUdF3-mC0zbFzG9Dv9M6ikoPP1oFQ', data)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail());
      })
  }
);