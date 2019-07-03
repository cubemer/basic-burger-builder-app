import * as types from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authStart = (state) => (
  updatedObject(state, {error: null, loading: true})
)

const authSuccess = (state, action) => (
  updatedObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  })
)

const authFail = (state, action) => (
  updatedObject(state, {error: action.error, loading: false})
)

const authLogout = (state) => (
  updatedObject(state, {token: null, userId: null})
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START: return authStart(state);
    case types.AUTH_SUCCESS: return authSuccess(state, action);
    case types.AUTH_FAIL: return authFail(state, action);
    case types.AUTH_LOGOUT: return authLogout(state);
    default:
      return state;
  }
}

export default reducer;