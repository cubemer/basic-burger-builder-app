import reducer from './auth';
import * as actions from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  })

  it('should store the token upon login', () => {
    expect(reducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
      },
      {
        type: actions.AUTH_SUCCESS,
        token: 'token',
        userId: 'user-id'
      }))
    .toEqual(
      {
        token: 'token',
        userId: 'user-id',
        error: null,
        loading: false,
        authRedirectPath: '/'
      }
    )
  })
})