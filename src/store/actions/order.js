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

export const purchaseBurgerStart = (order) => (
  dispatch => {
    axios.post('/orders.json', order)
    .then(res => {
      dispatch(purchaseBurgerSuccess(res.data, order))
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });
  }
)