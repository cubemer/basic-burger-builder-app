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

export const purchaseBurger = (order) => (
  dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', order)
    .then(res => {
      dispatch(purchaseBurgerSuccess(res.data.name, order))
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });
  }
)