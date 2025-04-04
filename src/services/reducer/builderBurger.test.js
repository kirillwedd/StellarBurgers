import { ADD_BUILDER_BURGER_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT, REPLACE_BUN } from "../action/builderBurger";
import { burgerConstructorReducer, initialState } from "./builderBurger";

const initialIngredient = {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    uniqueId: "459265ea-bca8-4063-8c5f-01484b2f570d"
};

const initialBun = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    uniqueId: "6775a825-8661-47fb-b462-4f33c205b274"
};

const newBun = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
    uniqueId: "a557e247-a1eb-4b76-8a7a-1699b3d7d870"
};

const ingredient2 = {
    _id: "643d69a5c3f7b9001cfa0945",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0,
    uniqueId: "d0215f28-8360-4cf3-9e81-7b26f1a73bbb"
};

describe('burgerConstructorReducer', () => {
    it('должен возвращать начальное состояние', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
    });

    it('должен добавлять ингредиент', () => {
        const action = { type: ADD_BUILDER_BURGER_INGREDIENT, ingredient: initialIngredient };
        const newState = burgerConstructorReducer(initialState, action);
        expect(newState.ingredientsBurger).toContainEqual(initialIngredient);
    });

    it('должен заменять булочку', () => {
        const stateWithBurger = {
            ...initialState,
            ingredientsBurger: [initialIngredient],
            bun: initialBun
        };
        const action = { type: REPLACE_BUN, bun: newBun };
        const newState = burgerConstructorReducer(stateWithBurger, action);
        expect(newState.bun).toEqual(newBun);
    });

    it('должен удалять ингредиент', () => {
        const testState = {
            ingredientsBurger: [
                { uniqueId: '1', name: 'Ingredient 1' },
                { uniqueId: '2', name: 'Ingredient 2' }
            ]
        };
        const action = {
            type: REMOVE_INGREDIENT,
            payload: { _id: '1' }
        };
        const expectedState = {
            ingredientsBurger: [
                { uniqueId: '2', name: 'Ingredient 2' }
            ]
        };
 
        const newState = burgerConstructorReducer(testState, action);
        expect(newState).toEqual(expectedState);
    });

    it('должен перемещать ингредиент', () => {
        const stateWithIngredients = {
            ...initialState,
            ingredientsBurger: [initialIngredient, ingredient2],
        };
        const action = { type: MOVE_INGREDIENT, fromIndex: 0, toIndex: 1 };
        const newState = burgerConstructorReducer(stateWithIngredients, action);
        expect(newState.ingredientsBurger[0]).toEqual(ingredient2);
        expect(newState.ingredientsBurger[1]).toEqual(initialIngredient);
    });
});