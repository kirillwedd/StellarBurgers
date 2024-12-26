// actions/burgerActions.ts

import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../reducer/types/reducerTypes';

// Определение типов действий
export const ADD_BUILDER_BURGER_INGREDIENT = 'ADD_BUILDER_BURGER_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

// Определяем интерфейсы для каждого действия
interface IAddIngredientBuilderAction {
    type: typeof ADD_BUILDER_BURGER_INGREDIENT;
    ingredient: Ingredient & { uniqueId: string }; // Добавляем uniqueId к ингредиенту
}

interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT;
    payload: { id: string }; // Идентификатор ингредиента для удаления
}

interface IReplaceBunAction {
    type: typeof REPLACE_BUN;
    bun: Ingredient; // Новый бун
}

interface IMoveIngredientAction {
    type: typeof MOVE_INGREDIENT;
    fromIndex: number; // Индекс ингредиента, который нужно переместить
    toIndex: number; // Индекс, куда переместить ингредиент
}

// Объединяем все действия в один тип
export type BurgerActions = 
    IAddIngredientBuilderAction |
    IRemoveIngredientAction |
    IReplaceBunAction |
    IMoveIngredientAction;

// Действие для добавления ингредиента
export const addIngredient = (ingredientBurger: Ingredient): IAddIngredientBuilderAction => ({
    type: ADD_BUILDER_BURGER_INGREDIENT,
    ingredient: {
        ...ingredientBurger,
        uniqueId: uuidv4() // Генерация уникального идентификатора
    }
});

// Действие для удаления ингредиента
export const removeIngredient = (id: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload: { id },
});

// Действие для замены бун
export const replaceBun = (bun: Ingredient): IReplaceBunAction => ({
    type: REPLACE_BUN,
    bun
});

// Действие для перемещения ингредиента
export const moveIngredient = (fromIndex: number, toIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    fromIndex,
    toIndex,
});