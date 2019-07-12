import * as types from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

export const authStart = (state) => (
  updatedObject(state, {error: null, loading: true})
)

export const authSuccess = (state, action) => (
  updatedObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  })
)

export const authFail = (state, action) => (
  updatedObject(state, {error: action.error, loading: false})
)

export const authLogout = (state) => (
  updatedObject(state, {token: null, userId: null})
)

export const setAuthRedirectPath = (state, action) => (
  updatedObject(state, {authRedirectPath: action.path})
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START: return authStart(state);
    case types.AUTH_SUCCESS: return authSuccess(state, action);
    case types.AUTH_FAIL: return authFail(state, action);
    case types.AUTH_LOGOUT: return authLogout(state);
    case types.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;