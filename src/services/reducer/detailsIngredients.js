import { CLEAR_DETAILS_INGREDIENT, DETAILS_INGREDIENT } from "../action/detailsIngredients";

const initialState = {
    selectedIngredient: null,
};

export const detailsingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_INGREDIENT:
            return {
                ...state,
                selectedIngredient: action.payload,
            };
        case CLEAR_DETAILS_INGREDIENT:
            return {
                ...state,
                selectedIngredient: null,
            };
        default:
            return state;
    }
};

