import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../reducer/types/reducerTypes';


export const ADD_BUILDER_BURGER_INGREDIENT = 'ADD_BUILDER_BURGER_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';


interface IAddIngredientBuilderAction {
    type: typeof ADD_BUILDER_BURGER_INGREDIENT;
    ingredient: Ingredient & { uniqueId: string }; 
}

interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT;
    payload: { id: string }; 
}

interface IReplaceBunAction {
    type: typeof REPLACE_BUN;
    bun: Ingredient; 
}

interface IMoveIngredientAction {
    type: typeof MOVE_INGREDIENT;
    fromIndex: number;
    toIndex: number; 
}


export type BurgerActions = 
    IAddIngredientBuilderAction |
    IRemoveIngredientAction |
    IReplaceBunAction |
    IMoveIngredientAction;


export const addIngredient = (ingredientBurger: Ingredient): IAddIngredientBuilderAction => ({
    type: ADD_BUILDER_BURGER_INGREDIENT,
    ingredient: {
        ...ingredientBurger,
        uniqueId: uuidv4() 
    }
});


export const removeIngredient = (id: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload: { id },
});


export const replaceBun = (bun: Ingredient): IReplaceBunAction => ({
    type: REPLACE_BUN,
    bun
});


export const moveIngredient = (fromIndex: number, toIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    fromIndex,
    toIndex,
});