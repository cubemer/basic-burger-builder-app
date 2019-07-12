import * as types from '../../store/actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = state => updatedObject(state, {purchased: false});

const purchaseBurgerStart = state => updatedObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updatedObject(action.order, {id: action.order.id})
  return updatedObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
}

const purchaseBurgerFail = state => updatedObject(state, {loading: false});

const fetchOrdersStart = state => updatedObject(state, {loading: true});

const fetchOrdersSuccess = (state, action) => (
  updatedObject(state, {
    orders: action.orders,
    loading: false
  })
)

const fetchOrdersFail = state => updatedObject(state, {loading: false});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_INIT: return purchaseInit(state);
    case types.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case types.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case types.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case types.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case types.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case types.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state
  }
}

export default reducer;