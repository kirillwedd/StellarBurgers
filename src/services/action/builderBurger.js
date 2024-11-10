export const ADD_BUILDER_BURGER_INGREDIENT='ADD_BUILDER_BURGER_INGREDIENT';
export const  REMOVE_INGREDIENT='REMOVE_INGREDIENT';
export const REPLACE_BUN='REPLACE_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';


export const addIngredient = (ingredientBurger) => ({
    type: ADD_BUILDER_BURGER_INGREDIENT,
    ingredient: ingredientBurger
});

export const removeIngredient = (id) => ({
    type: REMOVE_INGREDIENT,
    payload: { id },
});

export const replaceBun = (bun) => ({
    type: REPLACE_BUN,
    bun
});

export const moveIngredient = ( fromIndex, toIndex) => {
    return {
      type: MOVE_INGREDIENT,
      fromIndex,
      toIndex,
    };
  };