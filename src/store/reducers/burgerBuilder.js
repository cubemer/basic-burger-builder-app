import * as types from '../actions/actionTypes';

const initialState = {
  ingredients: { lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0 },
  totalPrice: 2,
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
    default:
      return state;
  }
}

export default reducer;