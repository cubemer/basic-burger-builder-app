import * as types from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => (
  {
    type: types.PURCHASE_BURGER_SUCCESS,
    id: id,
    order: order
  }
);

export const purchaseBurgerFail = (error) => (
  {
    type: types.PURCHASE_BURGER_FAIL,
    error: error
  }
);

export const purchaseBurgerStart = () => (
  {type: types.PURCHASE_BURGER_START}
)

export const purchaseBurger = (order, token) => (
  dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, order)
    .then(res => {
      dispatch(purchaseBurgerSuccess(res.data.name, order))
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });
  }
)

export const purchaseInit = () => (
  {
    type: types.PURCHASE_INIT
  }
)

export const fetchOrdersSuccess = (orders) => (
  {
    type: types.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
)

export const fetchOrdersFail = (err) => (
  {
    type: types.FETCH_ORDERS_FAIL,
    error: err
  }
)

export const fetchOrdersStart = () => (
  {
    type: types.FETCH_ORDERS_START
  }
)

export const fetchOrders = (token) => (
   dispatch => {
    dispatch(fetchOrdersStart());
    axios.get(`/orders.json?auth=${token}`)
    .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        console.log('this failed');
        dispatch(fetchOrdersFail(err));
      })
  }
)