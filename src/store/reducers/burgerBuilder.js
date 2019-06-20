import * as types from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false
};

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 0.75,
  cheese: 0.5,
  meat: 1
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_INGREDIENTS:
      return { ...state,
        ingredients: { ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case types.REMOVE_INGREDIENTS:
      return { ...state,
        ingredients: { ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case types.SET_INGREDIENTS:
      return {  ...state,
        ingredients: {
          lettuce: action.ingredients.lettuce,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false
      }
    case types.FETCH_INGREDIENTS_FAILED:
      return {...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;