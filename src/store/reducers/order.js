import * as types from '../../store/actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case types.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case types.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.order,
        id: action.order.id
      }
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case types.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state
  }
}

export default reducer;