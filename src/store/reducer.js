import * as types from './actions';

const initialState = {
  ingredients: { lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0 },
  totalPrice: 2,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_INGREDIENTS:
      return { ...state,
        ingredients: { ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
      case types.REMOVE_INGREDIENTS:
        return { ...state,
          ingredients: { ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
          }
        };
    default:
      return state;
  }
}

export default reducer;