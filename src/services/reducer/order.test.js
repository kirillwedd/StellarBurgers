import { ORDER_PLACE_FAIL, ORDER_PLACE_REQUEST, ORDER_PLACE_SUCCESS } from "../action/order";
import { initialState, orderReducer } from "./order";

describe('orderReducer', () => {
    it('должен возвращать начальное состояние', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ORDER_PLACE_REQUEST", () => {
        const action = { type: ORDER_PLACE_REQUEST };
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };

        const newState = orderReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it("should handle ORDER_PLACE_SUCCESS", () => {
        const orderNumber = 12345;
        const ingredientsOrder = ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa0943"];
        const action = {
            type: ORDER_PLACE_SUCCESS,
            orderNumber,
            ingredientsOrder
        };
        const expectedState = {
            ...initialState,
            loading: false,
            orderNumber,
            ingredientsOrder
        };

        const newState = orderReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it("should handle ORDER_PLACE_FAIL", () => {
        const errorMessage = "Order placement failed!";
        const action = { type: ORDER_PLACE_FAIL, error: errorMessage };
        const expectedState = {
            ...initialState,
            loading: false,
            error: errorMessage
        };

        const newState = orderReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

});