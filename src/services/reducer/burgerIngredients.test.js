import { ADD_INGREDIENT, SET_ERROR, SET_LOADING, TAB_SWITCH } from "../action/burgerIngredients";
import { burgerIngredientsReducer, initialState } from "./burgerIngredients";

describe('burgerIngredientsReducer', () => {
    it('должен возвращать начальное состояние', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ADD_INGREDIENT", () => {
        const newIngredient = { _id:"643d69a5c3f7b9001cfa093e",
            name:"Филе Люминесцентного тетраодонтимформа",
            type:"main",
            proteins:44,
            fat:26,
            carbohydrates:85,
            calories:643,
            price:988,
            image:"https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v:0,
            uniqueId:"4d8cbf81-fc8f-4f6a-a441-9907444a436f" };
        const action = {
            type: ADD_INGREDIENT,
            payload: [...initialState.ingredients, newIngredient] 
        };
        
        const expectedState = {
            ...initialState,
            ingredients: [...initialState.ingredients, newIngredient],
        };

        const newState = burgerIngredientsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });


    it("should handle SET_LOADING", () => {
        const action = { type: SET_LOADING, payload: false };
        const expectedState = {
            ...initialState,
            loading: false,
        };

        const newState = burgerIngredientsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });


    it("should handle SET_ERROR", () => {
        const errorMessage = "An error occurred!";
        const action = { type: SET_ERROR, payload: errorMessage };
        const expectedState = {
            ...initialState,
            error: errorMessage,
        };

        const newState = burgerIngredientsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it("should handle TAB_SWITCH", () => {
        const action = { type: TAB_SWITCH, tabActive: 'sauce' };
        const expectedState = {
            ...initialState,
            activeTab: 'sauce',
        };

        const newState = burgerIngredientsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});