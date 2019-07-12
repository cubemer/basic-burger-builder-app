import * as types from '../actions/actionTypes';
import {updatedObject}from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 0.75,
  cheese: 0.5,
  meat: 1
};

const addIngredients = (state, action) => {
  const incIngredients = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
  });
  const incState = updatedObject(state, {
    ingredients: incIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  });
  return updatedObject(state, incState);
}

const removeIngredients = (state, action) => {
  const decIngredients = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  });
  const decState = updatedObject(state, {
    ingredients: decIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  });
  return updatedObject(state, decState);
}

const setIngredients = (state, action) => (
  updatedObject(state, {
    ingredients: {
      lettuce: action.ingredients.lettuce,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: initialState.totalPrice,
    error: false,
    building: false
  })
)

const fetchIngredientsFailed = (state) => updatedObject(state, { error: true });

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_INGREDIENTS: return addIngredients(state, action);
    case types.REMOVE_INGREDIENTS: return removeIngredients(state, action);
    case types.SET_INGREDIENTS: return setIngredients(state, action);
    case types.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
}

export default reducer;