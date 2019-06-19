import * as types from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => (
  {
    type: types.ADD_INGREDIENTS,
    ingredientName: name
  }
)
export const removeIngredient = (name) => (
  {
    type: types.REMOVE_INGREDIENTS,
    ingredientName: name
  }
)
export const setIngredients = (ingredients) => (
  {
    type: types.SET_INGREDIENTS,
    ingredients: ingredients
  }
)
export const fetchIngredientsFailed = () => (
  {
    type: types.FETCH_INGREDIENTS_FAILED
  }
)
export const initIngredients = () => {
  return dispatch => {
    axios.get('https://basic-burger-app.firebaseio.com/ingredients.json').then(
      res => {
      dispatch(setIngredients(res.data))
    }).catch(
      err => {
      dispatch(fetchIngredientsFailed())
    });
  }
}