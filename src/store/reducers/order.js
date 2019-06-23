import * as types from '../../store/actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        orders: state.orders.concat(newOrder)
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