import axios from 'axios';

import * as types from './actionTypes'

export const authStart = () => (
  { type: types.AUTH_START}
);

export const authSuccess = (token, userId) => (
  {
    type: types.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
);

export const authFail = (err) => (
  {
    type: types.AUTH_FAIL,
    error: err
  }
);

export const logout = () => (
  {
    type: types.AUTH_LOGOUT
  }
)

export const checkAuthTimeout = (timeout) => (
  dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, timeout);
  }
)

export const auth = (email, password, isSignup) => (
  dispatch => {
    dispatch(authStart());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBLuagUdF3-mC0zbFzG9Dv9M6ikoPP1oFQ';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBLuagUdF3-mC0zbFzG9Dv9M6ikoPP1oFQ';
    }
    axios.post(url, data)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
);