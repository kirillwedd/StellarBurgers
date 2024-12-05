export const DETAILS_INGREDIENT = 'SET_SELECTED_INGREDIENT';
export const CLEAR_DETAILS_INGREDIENT = 'CLEAR_SELECTED_INGREDIENT';

export const setDetailsIngredient = (ingredient) => ({
    type: DETAILS_INGREDIENT,
    payload: ingredient,
});

export const clearDetailsIngredient = () => ({
    type: CLEAR_DETAILS_INGREDIENT,
});