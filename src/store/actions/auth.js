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
  }
);